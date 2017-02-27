angular.module('auth', [])
.controller('AuthCtrl', function(authService){
  var vm = this;
  vm.authService = authService;
  vm.displayLoginButton = () =>
      localStorage.getItem('id_token') ? false : true;
});
