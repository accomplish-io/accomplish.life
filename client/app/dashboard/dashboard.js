(function () {
  'use strict';

  angular
    .module('dashboard', ['ui.materialize', '720kb.datepicker'])
    .controller('DashboardCtrl', function($scope, $http, authService, jwtHelper, lock, GoalFactory) {

      var vm = this;
      vm.quantity=false;
      vm.test = "blank";
      // Get user details from auth
      lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
        vm.payload = profile;
        console.log('vm.payload ',vm.payload);
        GoalFactory.findOrCreateUser(vm.payload.name, vm.payload.email)
          .then(user => {
            vm.user = user.data[0];
          });

        // Get user goals and render on page
        GoalFactory.getUserGoals(vm.payload.email)
          .then(goals => {
            goals.data.forEach(function(goal, index, goalsArr) {
              goal.progress = [[goal.number ? ((goal.Progresses.reduce(function(prev, next, index, progArr) {
                return angular.isNumber(next.number) ? prev + next.number : prev;
              }, 0)) / goal.number) * 100 : 70],
              [goal.due ? ((new Date() - new Date(goal.start)) / (new Date(goal.due) - new Date(goal.start))) * 100 : 50]];
            });
            vm.prepGoals(goals);

            console.log(vm.goals);
          });
      });

      vm.prepGoals = goals => {
        goals.data.forEach(goal => {
          if(goal.GoalId !== null) {
            goals.data.forEach(parent => {
              if (parent.id === goal.GoalId) {
                parent.hasChildren = true;
              }
            });
          }
          goal.subsDisplayed = false;
          goal.addDisplayed = false;
        });
        vm.goals = goals.data;
      };

      // vm.data = [
      //   [65],
      //   [28]
      // ];

      vm.labels = ['Progress'];
      vm.series = ['Actual Progress', 'Expected Progress'];

      vm.options = {
        scales: {
          yAxes: [
            {
              display: true
            }
          ],
          xAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                max: 100
              },
              gridLines: {
                display: false
              }
            }
          ],
        }
      };

      // Open up sub-goals
      vm.toggleSubs = function (goal) {
        goal.subsDisplayed = !goal.subsDisplayed;
      };

      vm.toggleAdd = function (goal) {
        goal.addDisplayed = !goal.addDisplayed;
      };

      vm.deleteGoal = function(id) {
        vm.displayed = vm.goals.reduce(function(memo, goal) {
          if (goal.subsDisplayed) {
            return memo.concat([goal.id]);
          }
          return memo;
        }, []);
        GoalFactory.deleteGoal(id)
          .then(function() {
            GoalFactory.getUserGoals(vm.payload.email)
              .then(function(goals) {
                vm.prepGoals(goals);
                vm.goals.forEach(function(goal) {
                  if (vm.displayed.includes(goal.id)) {
                    goal.subsDisplayed = true;
                  }
                });
              });
          });
      };

      // Add the entered goal into the database
      vm.addGoal = function(id) {
        vm.quantity = false;
        vm.displayed = vm.goals.reduce(function(memo, goal) {
          if (goal.subsDisplayed) {
            return memo.concat([goal.id]);
          }
          return memo;
        }, []);
        GoalFactory.createGoal(vm.goal, vm.payload.email, id)
          .then(function() {
            GoalFactory.getUserGoals(vm.payload.email)
              .then(function(goals) {
                vm.prepGoals(goals);
                vm.goals.forEach(function(goal) {
                  if (vm.displayed.includes(goal.id)) {
                    goal.subsDisplayed = true;
                  }
                });
              });
          });
        // Reset entry field
        vm.goal = '';
      };

      // Update goal completion status
      vm.updateCompleteGoal = function(goal) {
        goal.complete = !goal.complete;
        vm.displayed = vm.goals.reduce(function(memo, goal) {
          if (goal.subsDisplayed) {
            return memo.concat([goal.id]);
          }
          return memo;
        }, []);
        GoalFactory.updateGoal(goal.id, {complete: goal.complete})
          .then(function() {
            GoalFactory.getUserGoals(vm.payload.email)
              .then(function(goals) {
                vm.prepGoals(goals);
                vm.goals.forEach(function(goal) {
                  if (vm.displayed.includes(goal.id)) {
                    goal.subsDisplayed = true;
                  }
                });
              });
          });
      };

    });
})();
