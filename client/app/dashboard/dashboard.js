(function () {
  'use strict';

  angular
    .module('dashboard', ['ui.materialize', '720kb.datepicker'])
    .controller('DashboardCtrl', function($scope, $http, authService, jwtHelper, lock, UserFactory, GoalFactory, BackerFactory, ProgressFactory, DetailsFactory) {

      var vm = this;

      vm.quantity = false;
      vm.test = 'blank';
      vm.progNum = '';
      vm.goals = [];
      vm.quantity = false;
      vm.number = null;
      vm.unit = '';
      vm.barChart = {};
      vm.lineChart = {};
      vm.existingBackers = [];
      vm.showCollapsible = false;
      vm.currentDeleteGoal = null;

      // Get user details from auth
      vm.displayLoginButton = function() {
        localStorage.getItem('id_token') ? false : true;
      }

      lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
        vm.payload = profile;
        UserFactory.findOrCreateUser(vm.payload.name, vm.payload.email)
          .then(function(user) {
            vm.user = user.data[0];
            vm.renderGoals();
          });
      });

      // Get user goals and render on page
      vm.renderGoals = function() {
        //Note the goals who are currently displaying subgoals
        vm.noteDisplayed();
        GoalFactory.getUserGoals(vm.payload.email)
          .then(function(goals) {
            goals.data.forEach(function(goal, index, goalsArr) {
              goal.subsDisplayed = false;
              goal.addDisplayed = false;
              //Find parent of a subgoal and give it the necessary properties
              if(goal.GoalId !== null) {
                goals.data.forEach(function(parent) {
                  if (parent.id === goal.GoalId) {
                    parent.hasChildren = true;
                    if (!parent.incompleteChildren) {
                      parent.incompleteChildren = false;
                    }
                    if (!goal.complete) {
                      parent.incompleteChildren = true;
                    }
                  }
                });
              }
              //Create properties for rendering charts correctly
              goal.dayRange = vm.createDayRange(goal);
              goal.dateRange = vm.createDateRange(goal);
              goal.progressRange = vm.createProgressRange(goal);
              goal.label = vm.makeLabel(goal);
              var amountDone = [goal.number ? Math.floor(((goal.Progresses.reduce(function(prev, next, index, progArr) {
                return angular.isNumber(next.number) ? prev + next.number : prev;
              }, 0)) / goal.number) * 100) : 0];
              var amountDue = [goal.due ? Math.floor(((new Date() - new Date(goal.start)) / (new Date(goal.due) - new Date(goal.start))) * 100) : 0];
              goal.progress = [amountDone, amountDue];
            });
            vm.goals = goals.data;
            //Diplays the subgoals for goals that were noted at the beginning of renderGoals
            vm.restoreDisplayed();
          });
      };

      vm.makeLabel = function(goal) {
        var rate = Math.round(goal.number/(goal.dayRange.length - 1));
        return [goal.goalName + ' ' + rate + ' ' + goal.units + ' per day'];
      };

      //Make labels according to how many days have passed since a day started
      vm.createDayRange = function(goal) {
        var range = [];
        var day = 1;
        var timeLeft = new Date(goal.due) - new Date(goal.start);
        var oneDay = 86400000;
        while (timeLeft > 0) {
          range.push('Day ' + day);
          day++;
          timeLeft -= oneDay;
        }
        return range;
      };

      //Make labels according to the date
      vm.createDateRange = function(goal) {
        var range = [];
        var day = 1;
        var timeLeft = new Date(goal.due) - new Date(goal.start);
        var oneDay = 86400000;
        while (timeLeft > 0) {
          range.push(new Date(new Date(goal.start).valueOf() + (oneDay * (day - 1))).toDateString());
          day++;
          timeLeft -= oneDay;
        }
        return range;
      };

      //Make an array of how much progress was completed on by a certain day.
      vm.createProgressRange = function(goal) {
        var range = [[],[0]];
        var timeLeft = new Date(goal.due) - new Date(goal.start);
        var oneDay = 86400000;
        var i = 0;
        while (timeLeft > 0) {
          range[0].push(0);
          //range[1].push(goal.dayRange[i]);
          timeLeft -= oneDay;
          i++;
        }
        for (var j = 0; j < range[0].length; j++) {
          range[1].push((j + 1) * (goal.number/(range[0].length - 1)));
        }
        goal.Progresses.forEach(function(progress) {
          var occurred = new Date(progress.date).valueOf();
          for (var index = 0; index < range[0].length; index++) {
            var day = new Date(goal.start).valueOf() + (86400000 * (index));
            if (day > new Date()) {
              range[0][index] = null;
            }
            else if (occurred - day < 0) {
              range[0][index] += progress.number;
            }
          }
        });

        return range;
      };

      //Grab the goals that are currently displaying their subgoals
      vm.noteDisplayed = function() {
        vm.displayed = vm.goals.reduce(function(memo, goal) {
          if (goal.subsDisplayed) {
            return memo.concat([goal.id]);
          }
          return memo;
        }, []);
      };

      //Display subgoals that were noted so that user is less affected by rerender
      vm.restoreDisplayed = function() {
        vm.goals.forEach(function(goal) {
          if (vm.displayed.includes(goal.id)) {
            goal.subsDisplayed = true;
          }
        });
      };

      vm.barChart.labels = ['Progress'];
      vm.barChart.series = ['Actual Progress', 'Expected Progress'];
      vm.barChart.options = {
        scales: {
          yAxes: [{display: true}],
          xAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                max: 100,
                suggestedMax: 100
              },
              gridLines: {display: false}
            }
          ],
        }
      };

      // Open up sub-goals
      vm.toggleSubs = function (goal, $event) {
        goal.subsDisplayed = !goal.subsDisplayed;
        var spanElement = $event.target;
        $event.target.innerHTML === 'expand_more'
          ? angular.element(spanElement).html('expand_less')
          : angular.element(spanElement).html('expand_more');
      };

      vm.toggleAdd = function (goal) {
        goal.addDisplayed = !goal.addDisplayed;
      };

      vm.toggleUpdate = function() {
        vm.updateView = !vm.updateView;
      };

      vm.prepUpdate = function(goal) {
        DetailsFactory.setQuantifiable(!!goal.units);
        DetailsFactory.setSubGoalsExist(vm.hasSubGoals(goal));
        DetailsFactory.setGoalDetail(goal);
        var dateObj = new Date(goal.due);
        DetailsFactory.setUpdateGoal('due', dateObj);
        DetailsFactory.setUpdateGoal('number', '');
        DetailsFactory.setUpdateGoal('goalName', goal.goalName);
        DetailsFactory.setUpdateGoal('units', goal.units);
        DetailsFactory.setUpdateGoal('lineChartNum', goal.number);
      };

      vm.addProgress = function (goal) {
        $('#goalProgressModal').modal('close');
        ProgressFactory.postProgress(goal.id, {
          number: vm.progNum,
          date: new Date()
        })
          .then(function() {
            vm.renderGoals();
            vm.progNum = '';
            vm.number = null;
            vm.unit = '';
          });
      };

      vm.deleteGoal = function(id) {
        GoalFactory.deleteGoal(id)
          .then(function() {
            vm.currentDeleteGoal = null;
            vm.renderGoals();
          });
      };

      // Add the entered goal into the database
      vm.addGoal = function(id) {
        var myDate = new Date(Date.parse(vm.date) + 43100000);
        GoalFactory.createGoal(vm.goal, vm.payload.email, id, myDate, vm.number, vm.units)
          .then(function(goal) {
            vm.currentBackers.forEach(function(backer) {
              backer.GoalId = goal.data.id;
              BackerFactory.addBacker(backer)
                .then(function(backerX) {
                  BackerFactory.welcomeBacker(backerX);
                });
            });
            vm.currentBackers = [];
          })
          .then(function() {
            vm.renderGoals();
          });
        // Reset entry field
        vm.resetNewGoal();
      };

      vm.resetNewGoal = function() {
        vm.goal = '';
        vm.verb = '';
        vm.number = null;
        vm.date = null;
        vm.units = '';
        vm.quantity = false;
      };

      // Only show backer input field if someone wants to add a backer
      vm.showBackerInput = false;
      vm.atLeastOneBacker = false;
      var uniqueBackers = {};
      vm.addBacker = function() {
        vm.showBackerInput = true;
        vm.existingBackers = [];
        BackerFactory.getBackers(vm.user.id)
        .then(function(backers)  {
          var allBackers = backers.data;
          allBackers.forEach(function(current) {//create an object with unique backers
            uniqueBackers[current.backerEmail] = current;
          });
          for(var unique in uniqueBackers){
            vm.existingBackers.push(uniqueBackers[unique]);
          }
        });
      };

      // Submit backer's name and email
      vm.currentBackers = [];

      vm.deleteBacker = function(backer) {
        var spliced = vm.currentBackers.indexOf(backer);
        vm.currentBackers.splice(spliced, 1);
      };

      vm.deleteExistingBacker = function(backer) {
        //console.log('bacer in deleteExistingBacker ', backer);
        var spliced = vm.existingBackers.indexOf(backer);
        vm.existingBackers.splice(spliced, 1);
        BackerFactory.deleteBacker(backer.id)
        .then(function(){
          //console.log("Existing backer deleted");
        });
      };

      vm.submitBacker = function(goal) {
        //submit vm.backerName and vm.backerEmail
        var newBacker = {};
        newBacker.backerName = vm.backerName;
        newBacker.backerEmail = vm.backerEmail;
        newBacker.UserId = vm.user.id;
        vm.currentBackers.push(newBacker);

        //Reset entry field
        vm.backerName = '';
        vm.backerEmail = '';
        vm.atLeastOneBacker = true;
        vm.showBackerInput = false;
        vm.showCollapsible = false;
      };

      vm.addExistingBacker = function(backer) {
        vm.backerName = backer.backerName;
        vm.backerEmail = backer.backerEmail;
        vm.submitBacker();
      };

      vm.toggleCollapsible = function() {
        vm.showCollapsible = !vm.showCollapsible;
      };

      vm.updateThisGoal = function(goal) {
        GoalFactory.updateGoal(goal.id, vm.updateGoal)
        .then(function() {
          vm.renderGoals();
          vm.updateGoal = {};
          vm.updateView = false;
        });
      };

      vm.hasSubGoals = function(parent) {
        for(var i = 0; i < vm.goals.length; i++) {
          if(parent.id === vm.goals[i].GoalId) {
            return true;
          }
        }
        return false;
      };

      // Update goal completion status
      vm.updateCompleteGoal = function(goal) {
        vm.toggleUpdate();
        goal.complete = !goal.complete;
        GoalFactory.updateGoal(goal.id, {complete: goal.complete})
          .then(function() {
            vm.renderGoals();
          });
      };
    });
})();
