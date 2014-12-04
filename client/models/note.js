(function(){
  'use strict';

  angular.module('hapi-auth')
    .factory('Note', ['$rootScope', '$http', function($rootScope, $http){

      function showAll(){
        return $http.get('/notes');
      }

      return {showAll:showAll};
    }]);
})();