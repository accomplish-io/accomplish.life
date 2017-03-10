'use strict';

(function () {
  'use strict';

  angular
    .module('app')
    .factory('DetailsFactory', DetailsFactory);

  function DetailsFactory($http) {

    var setQuantifiable = function (quant) {
      quantifiable = quant;
    };

    var setGoalDetail = function (goalDet) {
      goalDetail = goalDet;
    };

    var setUpdateGoal = function (key, prop) {
      updateGoal[key] = prop;
    };

    var setSubGoalsExist = function (Boolean) {
      subGoalsExist = Boolean;
    };

    return {
      quantifiable: quantifiable,
      setQuantifiable: setQuantifiable,
      goalDetail: goalDetail,
      setGoalDetail: setGoalDetail,
      updateGoal: updateGoal,
      setUpdateGoal: setUpdateGoal,
      subGoalsExist: subGoalsExist,
      setSubGoalsExist: setSubGoalsExist,
    };

  };
})();