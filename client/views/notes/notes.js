
(function(){
  'use strict';

  angular.module('hapi-auth')
    .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', function($rootScope, $scope, $state, Note){
      $scope.title = 'Notes Page';
      $scope.note = {};

      Note.showAll().then(function(response){
        //debugger;
        $scope.notes = response.data;
      });

      $scope.submit = function(){
        Note.addNote($scope.note).then(function(response){
          debugger;
          $scope.note = {};
        });
      };
    }]);
})();