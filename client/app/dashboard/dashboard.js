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
          goals.data.forEach(goal =>{
            goal.subsDisplayed = true;
          });
          vm.goals = goals.data;
          console.log(vm.goals);
        });
    });

    vm.addGoal = function() {//adds the entered goal into the database
      GoalFactory.createGoal(vm.goal, vm.payload.email).then(function() {
        GoalFactory.getUserGoals(vm.payload.email)//reloads the goals dynamically
          .then(goals => {
            goals.data.forEach(goal =>{
              goal.subsDisplayed = true;
            });
            vm.goals = goals.data;
          });
      });
    vm.goal = '';
    vm.sub = null;
  }

  // update goal completion status
  vm.completeGoal = function(goal) {
    GoalFactory.updateGoal(goal.id, {complete: true})
      .then(function() {
        // dynamically reload goals on page
        GoalFactory.getUserGoals(vm.payload.email)
          .then(goals => {
            goals.data.forEach(goal =>{
              goal.subsDisplayed = true;
            });
            vm.goals = goals.data;
          });
      });
  };

  vm.toggleSubs = function (goal) {
    console.log('fire');
    console.log(goal);
    for (var i = 0; i < vm.goals.length; i++){
      if (vm.goals[i].id === goal.id) {
        console.log(vm.goals[i]);
        vm.goals[i].subsDisplayed = !vm.goals[i].subsDisplayed;
        console.log(vm.goals[i])
        return;
      }
    }
  };
  //not currently working  
  vm.toggleSubs =vm.toggleSubs.bind(this);

  vm.test = function() {
    GoalFactory.getUserGoals(vm.payload.email)//reloads the goals dynamically
          .then(goals => {
            goals.data.forEach(goal =>{
              goal.subsDisplayed = true;
            });
            vm.goals = goals.data;
          });
  }

});
}());

