(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$rootScope', 'authService', 'lock', 'authManager', 'jwtHelper', '$state'];

  function run($rootScope, authService, lock, authManager, jwtHelper, $state) {
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    $rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Use the authManager from angular-jwt to check for
    // the user's authentication state when the page is
    // refreshed and maintain authentication
    authManager.checkAuthOnRefresh();

    // Register synchronous hash parser
    lock.interceptHash();

    $rootScope.$on('$stateChangeStart', function(e, to) {
      if (to.authenticate) {
        if (!localStorage.getItem('id_token')) {
          e.preventDefault();
          $state.go('auth');
        }
      }
    });

  }

})();