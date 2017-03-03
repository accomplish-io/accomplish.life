'use strict';

(function () {
  'use strict';

  angular
    .module('app')
    .factory('BackerFactory', BackerFactory);

  function BackerFactory($http) {

    var addBacker = function addBacker(backer) {
      return $http({
        method: 'POST',
        url: 'api/backers',
        data: backer
      });
    };

    var getBackers = function getBackers(userId) {
      return $http({
        method: 'GET',
        url: 'api/backers/' + userId
      });
    };

    return {
      addBacker: addBacker,
      getBackers: getBackers
    };
  };
})();