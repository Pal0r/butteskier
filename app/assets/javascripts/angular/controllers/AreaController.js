angular.module('app').controller("AreaController",
    ['$location', '$scope', 'Restangular', 'AuthService', '$stateParams', '$http',
      function ($location, $scope, Restangular, AuthService, $stateParams, $http){
        if(!AuthService.isLoggedIn()){
          AuthService.setPageTryingToAccess();
          return $location.path('/sign_in');
        }
        // Hide the ui-view blur background
        $scope.hideBackground = false;

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
        $scope.commentFormData = {
          areaID: areaId
        };

        $scope.submitComment = function(){
          $http.post('/v1/comments', $scope.commentFormData)
          .success(function(comment){
              $scope.area.comments.push(comment)
            })
        };
        $scope.commentFields = [
          {
            key: 'comment_headline',
            type: 'input',
            templateOptions: {
              label: 'Comment Headline',
              required: true
            }
          },
          {
            key: 'comment_body',
            type: 'textarea',
            templateOptions: {
              label: "How'd it go today?",
              placeholder: 'Tell us about your day. Faceshots? Avy conditions? etc.',
              required: true
            }
          }
        ]
      }
    ]);