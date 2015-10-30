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
            // Since we cannot rely on accessor . reference for the username,
            // we have to construct the comment username here.
            response.comment.username = response.username;
            scope.area.comments.push(response.comment);
            // Reset the form upon successful post
            scope.commentFormData = {};
          })
      };
      scope.deleteComment = function(comment_id, commentIndex){
        $http.delete('/v1/comments/' + comment_id)
          .success(function(response){
          })
      };
      scope.commentFields = [
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
      ];
    }
  }
}]);