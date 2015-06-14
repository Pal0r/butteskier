angular.module('app').controller("AreaController",
    ['$location', '$scope', 'Restangular', 'AuthService', '$stateParams',
        function ($location, $scope, Restangular, AuthService, $stateParams){
            if(!AuthService.isLoggedIn()){
                AuthService.setPageTryingToAccess();
                return $location.path('/sign_in');
            }
            // used for state change event when using the sidebar nav
            var areaId = $stateParams.areaID;
            Restangular.one('areas', areaId).get().then(function(area){
                $scope.area = area;
                // show main image on pageload
                angular.forEach(area.grams, function(gram, index){
                    if(index == 0){
                        gram.visible = true;
                    }
                })
            });

            $scope.imageToggle = function(area, imageIndex){
                angular.forEach(area.grams, function(img){
                    img.visible = false;
                });
                area.grams[imageIndex].visible = true;
            };
        }

    ]);