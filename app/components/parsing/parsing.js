/* global tpen, angular */

tpen.service('parsingService', function ($rootScope) {
    var service = this;
    this.saveAnnotation = function (xywh, on) {
        if (!on.otherContent) {
            on.otherContent = [
                {
                    "@id": "list" + on['@id'],
                    "@type": "sc:AnnotationList",
                    "motivation": "transcription",
                    "resources": []
                }
            ];
        }
        var list = on.otherContent[0].resources;
        var anno = {
            "@id": "A" + list.length,
            "@type": "oa:Annotation",
            "motivation": "transcription",
            "chars": "",
            "on": on['@id'] + "#xywh=" + xywh
        };
        list.push(anno);
        $rootScope.$broadcast("create-annotation");
    };
});
tpen.controller('parsingController', function ($scope, RERUM, config, Manifest) {
    $scope.config = config;
    $scope.manifest = Manifest;
    RERUM.extractResources(Manifest);
    $scope.canvas = config.currentCanvas
        ? config.currentCanvas
        : Manifest.sequences[config.currentSequenceIndex].canvases[config.currentCanvasIndex];
});

tpen.directive('annotationLayer', function (Lists) {
    return {
        restrict: 'E',
        replace: true,
        template: '<canvas id="annotationLayer"></canvas>',
        link: function (scope, element) {
            scope.canvasElement = document.getElementById('parseImage').children[1];
            var annotations = Lists.getAllByProp('motivation', "transcription", scope.canvas.otherContent)[0];
            element.css({
                width: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                position: 'absolute',
                top: 0,
                left: 0
            });
            element.attr({
                width: scope.canvasElement.width,
                height: scope.canvasElement.height
            });
            var ctx = element[0].getContext('2d');

            // canvas reset
            function reset () {
                ctx.clearRect(0, 0, element[0].width, element[0].height);
            }
            function drawAnnotations (motive, type) {
                reset();
                scope.canvasElement = document.getElementById('parseImage').children[1];
                element.attr({
                    width: scope.canvasElement.width,
                    height: scope.canvasElement.height
                });
                if (!annotations) {
                    return false;
                }
                ctx.beginPath();
                angular.forEach(annotations.resources, function (a) {
                    if (a.on.startsWith(scope.canvas['@id'])
                        && (!motive || motive === a.motivation)
                        && (!type || type === a['@type'])) {
                        var pos = a.on.substr(a.on.indexOf("xywh=") + 5).split(",").map(function (a) {
                            return parseFloat(a);
                        });
                        ctx.rect(pos[0], pos[1], pos[2], pos[3]);
                    }
                });
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#00F';
                ctx.stroke();
            }
            drawAnnotations("transcription");
            scope.$on('create-annotation', function () {
                annotations = Lists.getAllByProp('motivation', "transcription", scope.canvas.otherContent)[0];
                drawAnnotations("transcription");
            });
        },
        controller: 'parsingController'
    };
});

tpen.directive('drawBox', function (drawBoxService, Lists) {
    return {
        restrict: 'E',
        replace: true,
        template: '<canvas id="drawingLayer"></canvas>',
        link: function (scope, element) {
            scope.canvasElement = document.getElementById('parseImage').children[1];
            element.css({
                width: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                position: 'absolute',
                top: 0,
                left: 0
            });
            element.attr({
                width: scope.canvasElement.width,
                height: scope.canvasElement.height
            });
            var ctx = element[0].getContext('2d');

            // variable that decides if something should be drawn on mousemove
            var drawing = false;

            // the last coordinates before the current move
            var centerX;
            var centerY;

            // canvas unit to pixels
            function pixelToUnit (px) {
                return px * (element.attr('width') / element[0].clientWidth);
            }
            function rect (x, y, w, h, color, width) {
                ctx.rect(x, y, w, h);
                ctx.lineWidth = width || 3;
                // color
                ctx.strokeStyle = color || '#fff';
                // draw it
                ctx.stroke();
            }
            element.bind('mousemove', function (event) {
                if (drawBoxService.action === "create" && drawing) {
                            // get current mouse position
                            var currentX = pixelToUnit(event.offsetX);
                            var currentY = pixelToUnit(event.offsetY);
                            draw(centerX, centerY, currentX, currentY);
                        }
            });

            function drawAnnotationsAt (xy, collection) {
                var list = [];
                angular.forEach(collection, function (a) {
                    var pos = a.on.substr(a.on.indexOf("xywh=") + 5).split(",").map(function (a) {
                        return parseFloat(a);
                    });
                    if (pos[0] < xy[0] && (pos[0] + pos[2]) > xy[0]
                        && pos[1] < xy[1] && (pos[1] + pos[3]) > xy[1]) {
                        rect(pos[0], pos[1], pos[2], pos[3], '#F00');
                    }
                });
                return list;
            }
            ;
            element.bind('click', function (event) {
                var xTap = pixelToUnit(event.offsetX);
                var yTap = pixelToUnit(event.offsetY);
                switch (drawBoxService.action) {
                    case "select":
                        var l = Lists.getAllByProp('motivation', "transcription", scope.canvas.otherContent)[0];
                        if(l){
                            drawAnnotationsAt([xTap, yTap], l.resources);
                        }
                        break;
                    case "destroy":
                        break;
                }
            });

            element.bind('mouseup', function (event) {
                // stop drawing
                drawing = false;

                // let the view know there is a new box
                scope.$apply();
            });

            // canvas reset
            function reset () {
                // Does not work because beginPath() is not recalled.
                // ctx.clearRect(0, 0, element[0].width, element[0].height);
                element[0].width = element[0].width;
            }
            function draw (startX, startY, currentX, currentY) {
                reset();
                var sizeX = currentX - startX;
                var sizeY = currentY - startY;
                drawBoxService.newBox = [startX, startY, sizeX, sizeY].join(",");
                rect(startX, startY, sizeX, sizeY);
            }
            element.bind('mousedown', function (event) {
                centerX = pixelToUnit(event.offsetX);
                centerY = pixelToUnit(event.offsetY);
                switch (drawBoxService.action) {
                    case "create":
                        // begins new line
                        ctx.beginPath();

                        drawing = true;
                        break;
                    case "destroy": // confirm delete
                        break;
                    case "select": // pick out an annotation
                        break;
                }
                scope.canvasElement = document.getElementById('parseImage').children[1];
                element.attr({
                    width: scope.canvasElement.width,
                    height: scope.canvasElement.height
                });
            });
            scope.$on('create-annotation', reset);
            scope.$on('view-canvas', reset);
        },
        controller: 'drawBoxController'
    };
});
tpen.service('drawBoxService', function (config) {
    this.newBox = "";
    this.canvas = config.currentCanvas;
});
tpen.controller('drawBoxController', function ($scope, parsingService, drawBoxService) {
    $scope.dbs = drawBoxService;
    $scope.saveAnnotation = function () {
        var pos = drawBoxService.newBox.split(",").map(function (a) {
            return parseFloat(a);
        });
        if (pos[2] < 0) {
            pos[0] += pos[2];
            pos[2] = -pos[2];
        }
        if (pos[3] < 0) {
            pos[1] += pos[3];
            pos[3] = -pos[3];
        }
        parsingService.saveAnnotation(pos.join(","), $scope.canvas || drawBoxService.canvas);
        drawBoxService.newBox = {};
    };
    drawBoxService.action = "create"; // select, destroy
});