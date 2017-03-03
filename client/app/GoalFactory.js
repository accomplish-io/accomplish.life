'use strict';

(function () {
  'use strict';

  angular
    .module('app')
    .factory('GoalFactory', GoalFactory);

  function GoalFactory($http) {

    var findOrCreateUser = function findOrCreateUser(name, email) {
      return $http({
        method: 'POST',
        url: 'api/auth',
        data: {
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

    var createGoal = function createGoal(text, email, GoalId, date, number, unit) {
      return $http({
        method: 'POST',
        url: 'api/goals/' + email,
        data: {
          goalName: text,
          GoalId: GoalId,
          number: number,
          units: unit,
          due: date
        }
      });
    };

    var getUserGoals = function getUserGoals(email) {
      return $http({
        method: 'GET',
        url: 'api/goals/' + email
      });
    };

    var deleteGoal = function deleteGoal(id) {
      return $http({
        method: 'DELETE',
        url: 'api/goal/' + id
      });
    };

    var getOneGoal = function getOneGoal(id) {
      return $http({
        method: 'GET',
        url: 'api/goal/' + id
      });
    };

    var updateGoal = function updateGoal(id, data) {
      return $http({
        method: 'PUT',
        url: 'api/goal/' + id,
        data: data
      });
    };

    return {
      findOrCreateUser: findOrCreateUser,
      findUser: findUser,
      getUserGoals: getUserGoals,
      createGoal: createGoal,
      updateGoal: updateGoal,
      deleteGoal: deleteGoal,
      updateUser: updateUser
    };
  };
})();