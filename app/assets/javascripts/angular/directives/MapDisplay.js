angular.module('app').directive('mapDisplay', ['areaFactory',
    function(areaFactory){
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'map.html',
            link: function(scope, element, attrs){
                // Wait for the http promise, then create the gmap markers
                areaFactory.getAreas().then(function(res){
                    scope.markers = [];
                    angular.forEach(res.data, function(area){
                        var marker = {};
                        marker["id"] = area.id;
                        marker["location"] = {
                            "latitude": area.lat,
                            "longitude": area.long
                        };
                        marker["name"] = area.name;
                        marker["windowOptions"] = {
                            visible: false
                        };
                        marker["onClick"] = function(){
                            this.windowOptions.visible = !this.windowOptions.visible;
                        };
                        marker["closeClick"] = function () {
                            this.windowOptions.visible = false;
                        };
                        marker["title"] = area.name;
                        scope.markers.push(marker)
                    });
                });

                // default map to center on Tumalo
                scope.map = { center: { latitude: "44.0051", longitude: "-121.6425" }, zoom: 11 };
                scope.options = {
                    mapTypeId: google.maps.MapTypeId.TERRAIN,
                    scrollwheel: false,
                    zoomControl: false,
                    panControl: false,
                    streetViewControl: false,
                    mapTypeControl: false
                };
            }
        }
    }]);