angular.module('app').directive('createReport',['$stateParams', '$http', function(){
  return{
    restrict: 'A',
    replace: true,
    scope: false,
    templateUrl: 'create_report_form.html',
    link: function(scope){
      scope.reportFields = [
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