angular.module('new', [])
.controller('NewCtrl', function(GoalFactory, lock) {//this controller is initialized when the modal window is displayed
  var vm = this;

  vm.goal = '';

  // lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
  //   vm.payload = profile;
  //   GoalFactory.findUser(vm.payload.email)
  //     .then(user => {
  //       vm.user = user.data;
  //     })
  // });

  lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
    console.log('profile ', profile);
    vm.payload = profile;
    console.log(profile);
    GoalFactory.findOrCreateUser(vm.payload.name, vm.payload.email)
      .then(user => {
        vm.user = user.data[0]
      })
  });
});