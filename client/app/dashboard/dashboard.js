(function () {
  'use strict';

  angular
    .module('dashboard', ['ui.materialize'])
    .controller('DashboardCtrl', function($scope, $http, authService, jwtHelper, lock, GoalFactory) {

    var vm = this;

    lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
      vm.payload = profile;
      console.log('vm.payload ',vm.payload);
      GoalFactory.findOrCreateUser(vm.payload.name, vm.payload.email)
        .then(user => {
          vm.user = user.data[0]

        });
      GoalFactory.getUserGoals(vm.payload.email)
        .then(goals => {
          vm.goals = goals.data;
        });
    });

    vm.addGoal = function() {//adds the entered goal into the database
      GoalFactory.createGoal(vm.goal, vm.payload.email).then(function() {
        GoalFactory.getUserGoals(vm.payload.email)//reloads the goals dynamically
          .then(goals => {
            vm.goals = goals.data;
          });
      });
    vm.goal = '';
  }

  // update goal completion status
  vm.completeGoal = function(goal) {
    GoalFactory.updateGoal(goal.id, {complete: true});
      // .then(function() {
      //   GoalFactory.getOneGoal(goal.id);
      // })
      // .then(function(gotGoal) {
      //   console.log(gotGoal);
      // })
  };

  vm.test = function() {
    GoalFactory.getUserGoals(vm.payload.email)//reloads the goals dynamically
          .then(goals => {
            vm.goals = goals.data;
          });
  }

});
}());

