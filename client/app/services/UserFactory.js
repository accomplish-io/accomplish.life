'use strict';

(function () {
  'use strict';

  angular
    .module('app')
    .factory('UserFactory', UserFactory);

  function UserFactory($http) {

    var findOrCreateUser = function findOrCreateUser(name, email) {
      return $http({
        method: 'POST',
        url: 'api/auth',
        data: {
          name: name,
          email: email
        }
      });
    };

    var findUser = function findUser(email) {
      return $http({
        method: 'GET',
        url: 'api/users/' + email
      });
    };

    var updateUser = function updateUser(email, data) {
      return $http({
        method: 'PUT',
        url: 'api/users/' + email,
        data: data
      });
    };

    return {
      findOrCreateUser: findOrCreateUser,
      findUser: findUser,
      updateUser: updateUser
    };
  };
})();