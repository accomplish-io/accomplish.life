(function () {
  'use strict';

  angular
    .module('details', ['ui.materialize', '720kb.datepicker'])
    .controller('DetailsCtrl', function($scope, $http, authService, jwtHelper, lock, UserFactory, GoalFactory, BackerFactory, ProgressFactory, DetailsFactory) {

      var vm = this;
      vm.barChart = {};
      vm.lineChart = {};

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
      vm.lineChart.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      vm.lineChart.series = ['Series A', 'Series B'];
      vm.lineChart.data = [
        [65, 59, 80, 81, 56, 55, 40]
      ];
      vm.lineChart.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              ticks: {
                beginAtZero: true,
                max: 100
              },
              type: 'linear',
              display: true,
              position: 'left'
            }
          ]
        }
      };

      vm.quantifiable = DetailsFactory.getQuantifiable();
      vm.subGoalsExist = DetailsFactory.getSubGoalsExist();
      vm.goalDetail = DetailsFactory.getGoalDetail();
      vm.updateGoal = DetailsFactory.getUpdateGoal();
      vm.lineChart.options.scales.yAxes[0].ticks.max = vm.updateGoal.lineChartNum;

      vm.quantity = false;
      vm.test = 'blank';
      vm.progNum = '';
      vm.goals = [];
      vm.quantity = false;
      vm.number = null;
      vm.unit = '';
      vm.existingBackers = [];
      vm.showCollapsible = false;
      vm.currentDeleteGoal = null;

      // Get user details from auth
      vm.displayLoginButton = () =>
      localStorage.getItem('id_token') ? false : true;

      lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
        vm.payload = profile;
        UserFactory.findOrCreateUser(vm.payload.name, vm.payload.email)
          .then(user => {
            vm.user = user.data[0];
          });
      });



      vm.makeLabel = function(goal) {
        var rate = Math.round(goal.number/(goal.dayRange.length - 1));
        return [goal.goalName + ' ' + rate + ' ' + goal.units + ' per day'];
      };

      vm.createDayRange = (goal) => {
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

      vm.createDateRange = (goal) => {
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

      vm.createProgressRange = (goal) => {
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
        goal.Progresses.forEach((progress) => {
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

      vm.noteDisplayed = () => {
        vm.displayed = vm.goals.reduce(function(memo, goal) {
          if (goal.subsDisplayed) {
            return memo.concat([goal.id]);
          }
          return memo;
        }, []);
      };

      vm.restoreDisplayed = () => {
        vm.goals.forEach(function(goal) {
          if (vm.displayed.includes(goal.id)) {
            goal.subsDisplayed = true;
          }
        });
      };

      vm.addProgress = function (goal) {
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
        newBacker.name = vm.backerName;
        newBacker.email = vm.backerEmail;
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
