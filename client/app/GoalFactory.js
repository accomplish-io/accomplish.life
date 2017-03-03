'use strict';

(function () {
  'use strict';

  angular
    .module('app')
    .factory('GoalFactory', GoalFactory);

  function GoalFactory($http) {

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

    var deleteGoal = function deleteGoal(id) {
      return $http({
        method: 'DELETE',
        url: 'api/goal/' + id
      });
    };

    return {
      createGoal: createGoal,
      getUserGoals: getUserGoals,
      getOneGoal: getOneGoal,
      updateGoal: updateGoal,
      deleteGoal: deleteGoal
    };
  };
})();