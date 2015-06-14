angular.module('app').directive('mapDisplay', ['Restangular',
    function(Restangular){
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'map.html',
            link: function(scope, element, attrs){
                // Wait for the Restangular promise, then create the gmap markers
                Restangular.all('areas').getList().then(function(areas){
                    scope.markers = [];
                    angular.forEach(areas, function(area){
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
                    scrollwheel: false
                };
            }
        }
    }]);