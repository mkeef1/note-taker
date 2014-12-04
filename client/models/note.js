(function(){
  'use strict';

  angular.module('hapi-auth')
    .factory('Note', ['$rootScope', '$http', function($rootScope, $http){

      function showAll(){
        return $http.get('/notes');
      }

      function addNote(note){
        return $http.post('/notes', note);
      }

      return {showAll:showAll, addNote:addNote};
    }]);
})();