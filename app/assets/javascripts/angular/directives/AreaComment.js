angular.module('app').directive('areaComments',['$stateParams', '$http', function($stateParams, $http){
  return{
    restrict: 'A',
    replace: true,
    scope: false,
    templateUrl: 'areas/comment.html',
    link: function(scope){
      scope.commentFormData = {
        areaID: $stateParams.areaID
      };
      scope.submitComment = function(){
        $http.post('/v1/comments', scope.commentFormData)
          .success(function(response){
            scope.area.comments.push(response.comment);
            // Reset the form upon successful post
            scope.commentFormData = {};
          })
      };
      scope.deleteComment = function(comment_id, commentIndex){
        $http.delete('/v1/comments/' + comment_id)
          .success(function(response){
            scope.area.comments.splice(commentIndex, 1)
          })
      };
      scope.commentFields = [
        {
          key: 'comment_headline',
          type: 'input',
          templateOptions: {
            label: 'Headline',
            placeholder: "What's this spot like?"
          }
        },
        {
          key: 'comment_body',
          type: 'textarea',
          templateOptions: {
            label: "Describe the area",
            placeholder: 'Tell us about the area. Better approach? What are the best days to visit?'
          }
        }
      ];
    }
  }
}]);