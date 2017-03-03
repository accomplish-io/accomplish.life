'use strict';

(function () {
  'use strict';

  angular
    .module('app')
    .factory('ProgressFactory', ProgressFactory);

  function ProgressFactory($http) {

    var postProgress = function postProgress(goalId, data) {
      return $http({
        method: 'POST',
        url: 'api/progress/' + goalId,
        data: data
      });
    };

    var getProgress = function getProgress(goalId) {
      return $http({
        method: 'GET',
        url: 'api/progress/' + goalId
      });
    };

    return {
      postProgress: postProgress,
      getProgress: getProgress
    };
  };
})();