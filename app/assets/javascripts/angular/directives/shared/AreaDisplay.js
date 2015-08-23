angular.module('app').directive('areaDisplay',
    function(){
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'shared/area.html',
            scope: {
                area: '='
            }
        }
});
