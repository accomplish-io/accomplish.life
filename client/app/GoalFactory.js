(function() {
  'use strict';

  angular
    .module('app')
    .factory('GoalFactory', GoalFactory);

  function GoalFactory($http) {
    const findOrCreateUser = (name, email) =>
      $http({
        method: 'POST',
        url: 'api/auth',
        data: {
          email: email
        }
      });

    const findUser = (email) =>
      $http({
        method: 'GET',
        url: `api/users/${email}`,
      });

    const updateUser = (email, data) =>
      $http({
        method: 'PUT',
        url: `api/users/${email}`,
        data: data
      });

    const createGoal = (text, email, GoalId, number, unit) =>
      $http({
        method: 'POST',
        url: `api/goals/${email}`,
        data: {
          goalName: text,
          GoalId: GoalId,
          number: number,
          units: unit
        }
      });

    const getUserGoals = (email) =>
      $http({
        method: 'GET',
        url: `api/goals/${email}`
      });

    const deleteGoal = (id) =>
      $http({
        method: 'DELETE',
        url: `api/goal/${id}`
      });

    const getOneGoal = (id) =>
      $http({
        method: 'GET',
        url: `api/goal/${id}`
      });

    const updateGoal = (id, data) =>
      $http({
        method: 'PUT',
        url: `api/goal/${id}`,
        data: data
      });

    const postProgress = (goalId, data) =>
      $http({
        method: 'POST',
        url: `api/progress/${goalId}`,
        data: data
      });

    const getProgress = (goalId) =>
      $http({
        method: 'GET',
        url: `api/progress/${goalId}`
      });


    return {
      findOrCreateUser: findOrCreateUser,
      findUser: findUser,
      getUserGoals: getUserGoals,
      createGoal: createGoal,
      updateGoal: updateGoal,
      deleteGoal: deleteGoal,
      updateUser: updateUser,
      postProgress: postProgress,
      getProgress: getProgress
    };
  };
})();
