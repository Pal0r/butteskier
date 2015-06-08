angular.module('app').controller("AreaController",
    ['$location', '$scope', 'Restangular', 'AuthService',
        function ($location, $scope, Restangular, AuthService){
            if(!AuthService.isLoggedIn()){
                AuthService.setPageTryingToAccess();
                return $location.path('/sign_in');
            }
            $scope.area = Restangular.one('areas').get().$object;
        }
    ]);