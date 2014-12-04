
(function(){
  'use strict';

  angular.module('hapi-auth')
    .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', function($rootScope, $scope, $state, Note){
      $scope.title = 'Notes Page';

      Note.showAll().then(function(response){
        debugger;
        $scope.notes = response.data;
      });
    }]);
})();