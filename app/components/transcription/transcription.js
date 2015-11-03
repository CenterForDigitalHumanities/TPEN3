/* global angular */

tpen.service('transcriptionService', function (config, $cacheFactory) {
    var service = this;
    var clipCache = $cacheFactory.get("clips") || $cacheFactory("clips");
    var buffer = config.buffer;
    var closeCrop = config.closeCrop;
    this.getClip = function (canvas, selector, bottomImg) {
        var chkCache = clipCache.get(selector + (bottomImg && 'B' || 'A'));
        if (chkCache) {
            return chkCache;
        }
        var pos = (selector && (selector.indexOf("xywh") > 1))
            ? selector.substr(selector.indexOf("xywh=") + 5).split(",").map(function (a) {
            return parseInt(a);
        })
            : [0, 0, canvas.width, canvas.height].map(function (a) {
            return parseInt(a);
        });
        pos[0] -= canvas.width * buffer;
        pos[3] += canvas.width * buffer * 2;
        if (bottomImg) {
            pos[1] += pos[3];
            if (!closeCrop) {
                pos[0] = 0;
                pos[2] = canvas.width;
                pos[3] = canvas.height - pos[1] - pos[3];
            }
        } else {
            pos[1] -= canvas.width * buffer;
            if (!closeCrop) {
                pos[0] = 0;
                pos[2] = canvas.width;
            }
        }
        if (pos[0] < 0)
            pos[0] = 0;
        if (pos[1] < 0)
            pos[1] = 0;
        var reselector = selector.split("#xywh")[0]
            + "#xywh=" + pos[0] + "," + pos[1]
            + "," + pos[2] + "," + pos[3];
        clipCache.put(selector + (bottomImg && 'B' || 'A'), reselector);
        return reselector;
    };

});

tpen.controller('transcriptionController', function ($scope, hotkeys, Manifest, RERUM, config, $rootScope) {
    $scope.config = config;
    $scope.manifest = Manifest;
    RERUM.extractResources(Manifest);
    $scope.canvas = Manifest.sequences[$scope.config.currentSequenceIndex].canvases[$scope.config.currentCanvasIndex];
    hotkeys.add({
        combo: 'alt+enter',
        description: 'Fullscreen',
        callback: function () {
            $scope.config.fullscreen = !$scope.config.fullscreen;
            $rootScope.$broadcast('resize');
        }
    });
    $scope.validate = function () {
        var msg = [];
        if (!Manifest.label) {
            msg.push({
                text: 'Manifest has no label.',
                type: 'warning'
            });
        }
        if (!Manifest.sequences || !Manifest.sequences[0]) {
            msg.push({
                text: 'Manifest has no canvas sequences.',
                type: 'danger'
            });
            return msg;
        }
        if (!Manifest.sequences[$scope.config.currentSequenceIndex].canvases
            || !Manifest.sequences[$scope.config.currentSequenceIndex].canvases.length) {
            msg.push({
                text: 'Manifest sequence has no canvases.',
                type: 'danger'
            });
            return msg;
        }
        if (!$scope.canvas.otherContent
            || !$scope.canvas.otherContent[0]
            || !$scope.canvas.otherContent[0].resources) {
            msg.push({
                text: 'There are no lines to transcribe on this page.',
                type: 'info'
            });
            return msg;
        }
        return msg;
    };
    $scope.$watch('canvas', function () {
        $scope.messages = $scope.validate();
        if (!$scope.messages.length) {
            $scope.focus = $scope.canvas.otherContent[0].resources[0];
        } else {
            $scope.focus = {};
        }
    });
});

tpen.value('config',{
    buffer: .05, // percent of canvas height
    closeCrop: false, // show just enough around a slice to view
    currentSequenceIndex: 0,
    currentCanvasIndex: 0
});

tpen.controller('canvasTranscriptionController', function ($scope, transcriptionService, config) {
    var buffer = config.buffer;
    $scope.transcriptionClip = function(selector, bottomImg){
        return transcriptionService.getClip($scope.canvas, selector, bottomImg);
    };
});

tpen.directive('canvasTranscription', function () {
    return {
        restrict: 'E',
        scope: '=canvas',
        templateUrl: 'components/transcription/canvasTranscription.html',
        controller: 'canvasTranscriptionController'
    };
});

tpen.directive('bookmark', function (transcriptionService) {
    return {
        restrict: 'E',
        scope: {
            bounds: '=',
            canvas: '='
        },
        link: function (scope, element) {
            var CSSstyle = {
                display: "block",
                position: "absolute"
            };
            var proportionalPositioning = function (bounds, imageSlice) {
                CSSstyle.left = (bounds[0] - imageSlice[0]) / imageSlice[2] * 100 + "%"; // set X
                CSSstyle.top = (bounds[1] - imageSlice[1]) / imageSlice[3] * 100 + "%"; // set Y
                CSSstyle.width = bounds[2] / imageSlice[2] * 100 + "%"; // set W
                CSSstyle.height = bounds[3] / imageSlice[3] * 100 + "%"; // set H
                return CSSstyle;
            };
            var pos = (scope.bounds && (scope.bounds.indexOf("xywh") > 1))
                ? scope.bounds.substr(scope.bounds.indexOf("xywh=") + 5).split(",").map(function (a) {
                return parseInt(a);
            })
                : [0, 0, scope.canvas.width, scope.canvas.height].map(function (a) {
                return parseInt(a);
            });
            var box = transcriptionService.getClip(scope.canvas,scope.bounds);
            var boxPos = (box && (box.indexOf("xywh") > 1))
                ? box.substr(box.indexOf("xywh=") + 5).split(",").map(function (a) {
                return parseInt(a);
            })
                : [0, 0, scope.canvas.width, scope.canvas.height].map(function (a) {
                return parseInt(a);
            });
            scope.$watch('bounds', function () {
                element.css(proportionalPositioning(pos, boxPos));
            });
        }
    };
});

// Mock Manifest
tpen.value('Manifest', {
    "@context": "http://iiif.io/api/presentation/2/context.json",
    "@type": "sc:Manifest",
    "label": "New Manifest",
    "resources": [],
    "metadata": [],
    "sequences": [
        {
            "@id": "normal sequence",
            "@type": "sc:Sequence",
            "canvases": [
                {
                    "@id": "c1",
                    "@type": "sc:Canvas",
                    "label": "0001_al_piatto.anteriore",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": "http://digital.vatlib.it/con/thumb/Cappon.52/0001_al_piatto.anteriore",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ],
                    "otherContent": [
                        {
                            "@id": "aList",
                            "@type": "sc:AnnotationList",
                            "resources": [
                                {
                                    "@id": "A1",
                                    "@type": "oa:Annotation",
                                    "motivation": "transcription",
                                    "chars": "",
                                    "on": "c1#xywh=15,15,700,225"
                                }
                            ]
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0002_ba_risguardia.anteriore",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0002_ba_risguardia.anteriore",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0003_cy_0001r",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0003_cy_0001r",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0004_cy_0001v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0004_cy_0001v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0005_cy_0002r",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0005_cy_0002r",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0006_cy_0002v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0006_cy_0002v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0007_fa_0001r",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0007_fa_0001r",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0008_fa_0001v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0008_fa_0001v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0009_fa_0002r",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0009_fa_0002r",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0010_fa_0002v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0010_fa_0002v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0011_fa_0003r",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0011_fa_0003r",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0012_fa_0003v",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0012_fa_0003v",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0013_fa_0004r",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0013_fa_0004r",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0014_fa_0004v",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0014_fa_0004v",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0015_fa_0006r.%5B01.xy.0002%5D",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0015_fa_0006r.%5B01.xy.0002%5D",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0016_fa_0006v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0016_fa_0006v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0017_fa_0007r",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0017_fa_0007r",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0018_fa_0007v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0018_fa_0007v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0019_fa_0008r",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0019_fa_0008r",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0020_fa_0008v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0020_fa_0008v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0021_fa_0009r",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0021_fa_0009r",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0022_fa_0009v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0022_fa_0009v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0023_fa_0010r",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0023_fa_0010r",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0024_fa_0010v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0024_fa_0010v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0025_fa_0011r",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0025_fa_0011r",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0026_fa_0011v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0026_fa_0011v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0027_fa_0012r",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0027_fa_0012r",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0028_fa_0012v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0028_fa_0012v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0029_fa_0013r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0029_fa_0013r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0030_fa_0013v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0030_fa_0013v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0031_fa_0014r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0031_fa_0014r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0032_fa_0014v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0032_fa_0014v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0033_fa_0015r",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0033_fa_0015r",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0034_fa_0015v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0034_fa_0015v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0035_fa_0016r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0035_fa_0016r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0036_fa_0016v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0036_fa_0016v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0037_fa_0017r",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0037_fa_0017r",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0038_fa_0017v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0038_fa_0017v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0039_fa_0018r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0039_fa_0018r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0040_fa_0018v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0040_fa_0018v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0041_fa_0019r",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0041_fa_0019r",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0042_fa_0019v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0042_fa_0019v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0043_fa_0020r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0043_fa_0020r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0044_fa_0020v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0044_fa_0020v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0045_fa_0021r",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0045_fa_0021r",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0046_fa_0021v",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0046_fa_0021v",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0047_fa_0022r",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0047_fa_0022r",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0048_fa_0022v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0048_fa_0022v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0049_fa_0023r",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0049_fa_0023r",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0050_fa_0023v",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0050_fa_0023v",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0051_fa_0024r",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0051_fa_0024r",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0052_fa_0024v",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0052_fa_0024v",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0053_fa_0025r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0053_fa_0025r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0054_fa_0025v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0054_fa_0025v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0055_fa_0026r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0055_fa_0026r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0056_fa_0026v",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0056_fa_0026v",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0057_fa_0027r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0057_fa_0027r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0058_fa_0027v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0058_fa_0027v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0059_fa_0028r",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0059_fa_0028r",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0060_fa_0028v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0060_fa_0028v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0061_fa_0029r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0061_fa_0029r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0062_fa_0029v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0062_fa_0029v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0063_fa_0030r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0063_fa_0030r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0064_fa_0030v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0064_fa_0030v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0065_fa_0031r",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0065_fa_0031r",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0066_fa_0031v",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0066_fa_0031v",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0067_fa_0032r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0067_fa_0032r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0068_fa_0032v",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0068_fa_0032v",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0069_fa_0033r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0069_fa_0033r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0070_fa_0033v",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0070_fa_0033v",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0071_fa_0034r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0071_fa_0034r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0072_fa_0034v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0072_fa_0034v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0073_fa_0035r",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0073_fa_0035r",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0074_fa_0035v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0074_fa_0035v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0075_fa_0036r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0075_fa_0036r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0076_fa_0036v",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0076_fa_0036v",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0077_fa_0037r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0077_fa_0037r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0078_fa_0037v",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0078_fa_0037v",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0079_fa_0038r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0079_fa_0038r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0080_fa_0038v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0080_fa_0038v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0081_fa_0039r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0081_fa_0039r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0082_fa_0039v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0082_fa_0039v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0083_fa_0040r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0083_fa_0040r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0084_fa_0040v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0084_fa_0040v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0085_fa_0041r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0085_fa_0041r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0086_fa_0041v",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0086_fa_0041v",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0087_fa_0042r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0087_fa_0042r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0088_fa_0042v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0088_fa_0042v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0089_fa_0043r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0089_fa_0043r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0090_fa_0043v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0090_fa_0043v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0091_fa_0044r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0091_fa_0044r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0092_fa_0044v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0092_fa_0044v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0093_fa_0045r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0093_fa_0045r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0094_fa_0045v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0094_fa_0045v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0095_fa_0046r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0095_fa_0046r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0096_fa_0046v",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0096_fa_0046v",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0097_fa_0047r",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0097_fa_0047r",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0098_fa_0047v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0098_fa_0047v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0099_fa_0048r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0099_fa_0048r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0100_fa_0048v",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0100_fa_0048v",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0101_fa_0049r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0101_fa_0049r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0102_fa_0049v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0102_fa_0049v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0103_fa_0050r",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0103_fa_0050r",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0104_fa_0050v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0104_fa_0050v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0105_fa_0051r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0105_fa_0051r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0106_fa_0051v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0106_fa_0051v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0107_fa_0052r",
                    "height": 1000,
                    "width": 747,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0107_fa_0052r",
                                "@type": "dcTypes:Image",
                                "width": 112,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0108_fa_0052v",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0108_fa_0052v",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0109_fa_0053r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0109_fa_0053r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0110_fa_0053v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0110_fa_0053v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0111_fa_0054r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0111_fa_0054r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0112_fa_0054v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0112_fa_0054v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0113_fa_0055r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0113_fa_0055r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0114_fa_0055v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0114_fa_0055v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0115_fa_0056r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0115_fa_0056r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0116_fa_0056v",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0116_fa_0056v",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0117_fa_0057r",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0117_fa_0057r",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0118_fa_0057v",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0118_fa_0057v",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0119_fa_0058r",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0119_fa_0058r",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0120_fa_0058v",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0120_fa_0058v",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0121_fa_0059r",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0121_fa_0059r",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0122_fa_0059v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0122_fa_0059v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0123_fa_0060r",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0123_fa_0060r",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0124_fa_0060v",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0124_fa_0060v",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0125_fa_0061r",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0125_fa_0061r",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0126_fa_0061v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0126_fa_0061v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0127_fa_0062r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0127_fa_0062r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0128_fa_0062v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0128_fa_0062v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0129_fa_0063r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0129_fa_0063r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0130_fa_0063v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0130_fa_0063v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0131_fa_0064r",
                    "height": 1000,
                    "width": 753,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0131_fa_0064r",
                                "@type": "dcTypes:Image",
                                "width": 113,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0132_fa_0064v",
                    "height": 1000,
                    "width": 760,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0132_fa_0064v",
                                "@type": "dcTypes:Image",
                                "width": 114,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0133_sy_0001r",
                    "height": 1000,
                    "width": 767,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0133_sy_0001r",
                                "@type": "dcTypes:Image",
                                "width": 115,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0134_sy_0001v",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0134_sy_0001v",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0135_sy_0002r",
                    "height": 1000,
                    "width": 773,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0135_sy_0002r",
                                "@type": "dcTypes:Image",
                                "width": 116,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0136_sy_0002v",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0136_sy_0002v",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0137_ye_risguardia.posteriore",
                    "height": 1000,
                    "width": 780,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0137_ye_risguardia.posteriore",
                                "@type": "dcTypes:Image",
                                "width": 117,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0138_yh_dorso",
                    "height": 1000,
                    "width": 173,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0138_yh_dorso",
                                "@type": "dcTypes:Image",
                                "width": 26,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0139_yl_taglio.centrale",
                    "height": 1000,
                    "width": 173,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0139_yl_taglio.centrale",
                                "@type": "dcTypes:Image",
                                "width": 26,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0140_yn_taglio.inferiore",
                    "height": 1000,
                    "width": 227,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0140_yn_taglio.inferiore",
                                "@type": "dcTypes:Image",
                                "width": 34,
                                "height": 150
                            }
                        }
                    ]
                },
                {
                    "@id": "",
                    "@type": "sc:Canvas",
                    "label": "0141_yp_taglio.superiore",
                    "height": 1000,
                    "width": 227,
                    "images": [
                        {
                            "@type": "oa:Annotation",
                            "motivation": "sc:painting",
                            "resource": {
                                "@id": " http://digital.vatlib.it/con/thumb/Cappon.52/0141_yp_taglio.superiore",
                                "@type": "dcTypes:Image",
                                "width": 34,
                                "height": 150
                            }
                        }
                    ]
                }
            ]
        }
    ]
});

// TODO: move this to RERUM tool
tpen.directive('selector', function () {
    return {
        scope: {
            selector: "="
        },
        controller: function ($scope, $element, $cacheFactory, RERUM) {
            var cache = $cacheFactory.get('imageSelector') || $cacheFactory('imageSelector');
            $scope.updateCrop = function () {
                var note = "<div class='help-block text-center bg-secondary'>no image</div>";
                if (!$scope.selector) {
                    $element.next().remove(); // delete any backup <canvas> that has been added
                    $element.after(note); // add "no image" note
                    $element.addClass('ng-hide');
                    return false;
                }
                var dataURL = cache.get("image" + $scope.selector); // dataURL for cropped image
                if (dataURL) {
                    try {
                        // has dataURL, let's not rebuild this thing
                        $element.attr('src', dataURL);
                        return;
                    } catch (err) {
                        // just run like usual
                    }
                }
                $scope.canvas = RERUM.getResource($scope.selector);
                if (angular.isObject($scope.selector) && $scope.canvas['@type'] && $scope.canvas['@type'] === 'sc:Canvas') {
                    $scope.selector = $scope.canvas['@id'];
                }
                if (!$scope.canvas.height) {
                    throw "No sc:Canvas loaded with id:" + $scope.canvas;
                }
                var pos = ($scope.selector && ($scope.selector.indexOf("xywh") > 1))
                    ? $scope.selector.substr($scope.selector.indexOf("xywh=") + 5).split(",").map(function (a) {
                    return parseInt(a);
                })
                    : [0, 0, $scope.canvas.width, $scope.canvas.height].map(function (a) {
                    return parseInt(a);
                });
                var hiddenCanvas = document.createElement('canvas');
                hiddenCanvas.width = pos[2];
                hiddenCanvas.height = pos[3];
                var ctx = hiddenCanvas.getContext("2d");
                var img = cache.get("img" + $scope.canvas['@id']) || new Image();
                var imgSelectorIndex = $scope.canvas.images[0].resource['@id'].indexOf("#");
                var src = (imgSelectorIndex > -1)
                    ? $scope.canvas.images[0].resource['@id'].substring(0, imgSelectorIndex)
                    : $scope.canvas.images[0].resource['@id'];
                var imgTrim = (imgSelectorIndex > -1)
                    ? $scope.canvas.images[0].resource['@id'].substring(imgSelectorIndex + 6).split(",") // #xywh=
                    : false;
                var loaded = function (e) {
                    var targ = e.target;
                    cache.put("img" + $scope.canvas['@id'], targ);
                    $element.next().remove(); // delete any backup <canvas> that has been added
                    $element.removeClass('ng-hide');
                    var scale = targ.width / $scope.canvas.width;
                    if (imgTrim) {
                        scale = imgTrim[2] / $scope.canvas.width;
                        for (var i = 0; i < 2; i++) {
                            if (imgTrim[i]) {                 // divide by zero protection
                                pos[i] += parseInt(imgTrim[i] / scale);
                            }
                        }
                        for (i = 2; i < 4; i++) {
                            pos[i] = pos[i] * scale;
                        }
                    }
                    ctx.drawImage(targ, pos[0] * scale, pos[1] * scale, pos[2] * scale, pos[3] * scale, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
                    try {
                        dataURL = cache.put("image" + $scope.selector, hiddenCanvas.toDataURL());
                        $element.attr('src', dataURL);
                    } catch (err) {
                        // Doesn't serve CORS images, so this doesn't work.
                        // load the canvas itself into the DOM since it is 'tainted'
                        $element.after(hiddenCanvas);
                        $element[0].style.width = "100%";
                        var ratio = $element[0].width / hiddenCanvas.width;
                        // BUG: When the img element is hidden, the width is 100, which is often a smaller slice than the screen really allows
                        $element.addClass('ng-hide');
                        hiddenCanvas.width = hiddenCanvas.width * ratio;
                        hiddenCanvas.height = hiddenCanvas.height * ratio;
                        // redraw, after width change
                        ctx.drawImage(targ, pos[0] * scale, pos[1] * scale, pos[2] * scale, pos[3] * scale, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
                    }
                };
                angular.element(img).one('load', loaded);
                angular.element(img).one('error', function (event) {
                    // CORS H8, probably, load tainted canvas
                    $element.one('load', loaded);
                    $element.attr('src', $scope.canvas.images[0].resource['@id']);
                });
                img.crossOrigin = "anonymous";
                img.src = src;
            };
            $scope.$watch('selector', $scope.updateCrop);
//            $scope.$on('resize', $scope.updateCrop);
        }
    };
});
