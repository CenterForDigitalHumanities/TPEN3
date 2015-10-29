/* global angular */

angular.module('utils', [])
    .filter('dedup', function () {
        /*
         * Remove duplicates from returned list for display.
         * Pass parameters in AngularJS with :param notation
         * @param {Array} items list to be filtered
         * @param {String} byProp filter based on property instead of compare
         * @param {Boolean} breakArray drill into arrays of arrays
         * @returns {Array}
         */
        return function (items, byProp, breakArray) {
            var deduped = [];
            if (byProp) {
                angular.forEach(items, function (item) {
                    if (item && item[byProp]) {
                        if (breakArray) {
                            while (item[byProp].length) {
                                var singleDeep = item[byProp].pop();
                                if (deduped.indexOf(singleDeep) === -1) {
                                    deduped.push(singleDeep);
                                }
                            }
                        } else if (byProp === "tags") {
                            // split tags to test
                            var tags = item[byProp].trim().split(" ");
                            var each;
                            while (tags.length) {
                                each = tags.pop();
                                if (deduped.indexOf(each) === -1) {
                                    deduped.push(each);
                                }
                            }
                        } else if (deduped.indexOf(item[byProp]) === -1) {
                            deduped.push(item[byProp]);
                        }
                    }
                });
            } else {
                angular.forEach(items, function (item) {
                    if (deduped.indexOf(item) === -1) {
                        deduped.push(item);
                    }
                });
            }
            return deduped;
        };
    })
    .service('Lists', function () {
        var service = this;
        this.indexBy = function (val, byProp, arr) {
            if (byProp) {
            if (arguments.length === 3) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i][byProp] === val) {
                        return i;
                    }
                }
                }
            } else {
                return arr.indexOf(val);
            }
            return -1;
        };
        this.addIfNotIn = function (entry, arr, byProp) {
            var foundAt = -1;
            if (!arr) {
                arr = [entry];
            }
            if (!entry) {
                return arr;
            }
            if (byProp === undefined) {
                foundAt = arr.indexOf(entry);
            } else {
                for (var i = 0; i < arr.length; i++) {
                    if (entry[byProp] === arr[i][byProp]) {
                        foundAt = i;
                        break;
                    }
                }
            }
            if (foundAt > -1) {
                arr.splice(foundAt, 1, entry);
            } else {
                arr.push(entry);
            }
            return arr;
        };
        this.removeFrom = function (entry, arr, byProp) {
            if (!arr || !entry) {
                return false;
            }
            var index = service.indexBy(entry, byProp, arr);
            if (index > -1) {
                arr.splice(index, 1);
                return true;
            }
            return false;
        };
        this.segregate = function (toClean, cache) {
            angular.forEach(toClean, function (i, index) {
                if (angular.isObject(i) && i.id) {
                    if (cache['id' + i.id]) {
                        angular.extend(cache['id' + i.id], i);
                    } else {
                        cache['id' + i.id] = i;
                    }
                    toClean[index] = i.id;
                }
            });
        };
        this.toArray = function (obj) {
            var list = [];
            angular.forEach(obj, function (item) {
                list.push(item);
            });
            return list;
        };
        this.dereferenceFrom = function (idArray, cache) {
            var list = [];
            if (idArray.length === 0) {
                return list;
            }
            if (idArray[0].id) {
                // not an idArray, but can be made into one, possibly
                service.segregate(idArray, cache);
            }
            angular.forEach(idArray, function (id, index) {
                list[index] = cache["id" + id];
            });
            return list;
        };
        this.getAllByProp = function (prop, val, cache, idOnly) {
            var list = [];
            angular.forEach(cache, function (item, key) {
                if (item[prop] == val) { // "1" or 1 is fine
                    if (idOnly) {
                        list.push(key);
                    } else {
                        list.push(item);
                    }
                }
            });
            return list;
        };
        function getTags (cache) {
            var tags = [];
            angular.forEach(cache, function (item) {
                if (item.tags) {
                    var t = item.tags.split(" ");
                    while (t.length) {
                        service.addIfNotIn(t.pop(), tags);
                    }
                }
            });
            return tags;
        }
        ;
        this.getAllPropValues = function (prop, cache, exceptTags) {
            var list = [];
            if (!exceptTags) {
                exceptTags = [];
            }
            if (prop === "tags") {
                list = getTags(cache);
                angular.forEach(exceptTags, function (t) {
                    var i = list.indexOf(t);
                    if (i > -1) {
                        list.splice(i, 1);
                    }
                });
            } else {
            angular.forEach(cache, function (item) {
                for (var i = 0; i < exceptTags.length; i++) {
                    if (item.tags && item.tags.indexOf(exceptTags[i]) > -1) {
                        return false;
                    }
                }
                service.addIfNotIn(item[prop], list);
                });
            }
            return list;
        };
        this.intersectArrays = function (arrayA, arrayB) {
            var a = arrayA.slice(0);
            var toret = [];
            while (a.length) {
                var i = arrayB.indexOf(a.pop());
                if (i > -1) {
                    toret.push(arrayB[i]);
                }
            }
            return toret;
        };
    })
    .service('RERUM', function ($cacheFactory,Lists) {
        var service = this;
        var rcache={}; // cache without $cacheFactory, so I can see all the values
        var rerumCache = {
            get:function(key){
                return rcache[key];
            },
            put:function(key,val){
                rcache[key] = val;
                return val;
                }
        };

        var defs = {
            TEXT: ["cnt:chars", "dctypes:Text", "dcterms:Text"],
            IMAGE: ["dctypes:Image", "dcterms:Image","sc:Canvas"],
            AUDIO: ["dctypes:Sound", "dcterms:Sound"],
            VIDEO: ["dctypes:MovingImage", "dcterms:MovingImage"],
            ANY: [],
        };

        this.extractResources = function(obj){
            if(angular.isObject(obj)){
                var key;
                for(key in obj){
                    if(key === '@id'){
                        rerumCache.put(obj[key],obj);
                    }
                    service.extractResources(obj[key]);
                }
            }
        };
        this.getResource = function (res) {
            if (angular.isObject(res) || !res) {
                return res;
            }
            var index = res.indexOf("#");
            if(index>-1){
                res = res.substring(0,index);
            }
                if (rerumCache.get(res))
                    return rerumCache.get(res);
                // already a resource?
                var hasValue = Lists.getAllByProp("@value",res,rerumCache)[0];
            console.warn("Unable to resolve object: "+res);
            return res;
                    };
        this.getDescendantsByProp = function(startNode,key,val){
            var res = service.getResource(startNode);
            var maxReturn = 100; // Stop gathering if it gets huge
            var ds=[];
            angular.forEach([].concat(res['@list'], res['oa:hasTarget'], res.on), function (descendant) {
                if(descendant){
                    var d = service.getResource(descendant);
                    var test = (typeof val==="function") ? val : function(){
                        return d[key] && d[key]===val;
                    }
                    if(test(descendant,key)){
                        ds.push(descendant);
                        if(!--maxReturn){
                            throw "100 descendants discovered! Drilling down stopped.";
                        }
                    }
                    ds=ds.concat(service.getDescendantsByProp(d,key,val));
                }
            });
            return ds;
        };
        this.getSelector = function (strVar) {
            if (!strVar) {
                throw "No string provided for selector:" + strVar || "empty";
            }
            var str = (strVar['@id'] && (strVar['@id'] + "")) || strVar + "";
            var index = str.lastIndexOf("#");
            if (index > -1) {
                return str.substring(index + 1);
                // like 'xywh=0,0,120,40' or 't=0,40' or 'offset=0,60'
            } else {
                return "";
            }
        };
        this.getValues = function (anno, type) {
            var aid = anno['@id'] || anno;
            if (!type) type = "ANY";
            if (rerumCache.get(type + aid))
                return rerumCache.get(type + aid);
            anno=service.getResource(anno);
            var body = [].concat(anno['oa:hasBody'], anno.resource);
            var vals = [];
            if (defs[type]) {
                if (anno['@value']) {
                    body = [anno]; // just return the value of the annotation
                }
                angular.forEach(body, function (b) {
                    if (!b)
                        return; // undefined in array
                    if(type==="TEXT"){
                        return vals.push(service.selectWithOffset(b['@id']||b));
                    };
                    b=service.getResource(b);
                    if (type==="ANY" || (defs[type].indexOf(b['@type']) > -1)) {
                        vals.push(b['@value']);
                    }
                });
            }
            return rerumCache.put(type + aid, vals);
        };
        this.getTarget = function (anno) {

            // just most immediate target
        };
        this.getAttributions = function (aid) {
            var agents = [];
            var anno = (angular.isObject(aid)) ? aid : service.getResource(aid);
            var annotator=anno['oa:annotatedBy'];
            if (!angular.isArray(annotator))
                annotator = [annotator];
            angular.forEach(annotator,function(a){
                agents.push(service.getResource(a));
            });
            return agents;
        };
        this.getTargets = function (aid, type, noCheck) {
            if(!type) type = "ANY";
            var ts = [];
            var checkedMap = noCheck || {};
            var anno = service.getResource(aid);
            if(!anno){
                // undefined or blank sent in, so don't add any but continue in case of recursion
                return ts;
            }
            if (defs[type]) {
                if(checkedMap[anno['@id']]) {return [];} // We've been here before, avoid dups
                if (rerumCache.get("targ"+type + anno['@id']))
                    return rerumCache.get("targ"+type + anno['@id']);
                var target = [].concat(anno["oa:hasTarget"],anno.on);
                checkedMap[anno['@id']] = true;
                angular.forEach(target, function (t) {
                    if(!t)return; // continue loop past undefined/null
                    var res = service.getResource(t);
                    if(res['@list']||res.resources){
                        // this is an aggregation
                        angular.forEach([].concat(res['@list'],res.resources,res.images,res.otherContent), function(i){
                            if(!i)return; // continue loop past undefined/null
                            var item = service.getResource(i);
                            if (defs[type].indexOf(item['@type']) > -1) {
                                ts.push(i);
                            } else if (item['@type'] === "oa:Annotation" || item['@type'] === "ore:Aggregation") {
                                ts=ts.concat(service.getTargets(item,type,checkedMap));
                            }
                        });
                    }
                    if(res['@type']==="oa:Annotation" || res['@type']==="ore:Aggregation"){
                    // this is an intermediate annotation
                        ts=ts.concat(service.getTargets(res,type,checkedMap));
                    }
                    if (type==="ANY" || (defs[type].indexOf(res['@type']) > -1)) {
                        ts.push(t['@id']||t);
                    }
                });
            }
            return rerumCache.put("targ"+type+anno['@id'],ts);
        };

        this.queryAll = function(test){
            var rs=[];
            for (var entry in rcache) {
                if(test(rcache[entry])){
                    rs.push(rcache[entry]);
                }
            }
            return rs;
        };
        this.selectWithOffset = function(res){
            var text = service.getResource(res)['@value'];
            var offset = service.getSelector(res);
            if(offset && offset.indexOf("offset=")===0){
                offset = offset.substring(7).split(",");
                text = text.substring(offset[0],offset[1]);
            }
            return text;
        };
        this.manifestFromCanvas = function(cid,manifests){
            for(var i =0;i<manifests.length;i++){
                for(var j=0;j<manifests[i].sequences.length;j++){
                    for(var k=0;k<manifests[i].sequences[j].canvases.length;k++){
                        if(manifests[i].sequences[j].canvases[k]['@id']===cid){
                            return manifests[i];
                        }
                    }
                }
            }
            return {};
        };
    });