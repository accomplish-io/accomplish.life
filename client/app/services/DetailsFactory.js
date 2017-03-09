'use strict';

(function () {
  'use strict';

  angular
    .module('app')
    .factory('DetailsFactory', DetailsFactory);

  function DetailsFactory($http) {

    var quantifiable;
    var goalDetail;
    var updateGoal = {};
    var subGoalsExist;

    var setQuantifiable = function (quant) { quantifiable = quant; };
    var getQuantifiable = function () { return quantifiable; };

    var setGoalDetail = function (goalDet) { goalDetail = goalDet; };
    var getGoalDetail = function () { return goalDetail; };

    var setUpdateGoal = function (key, prop) { updateGoal[key] = prop; };
    var getUpdateGoal = function () { return updateGoal; };

    var setSubGoalsExist = function (Boolean) { subGoalsExist = Boolean; };
    var getSubGoalsExist = function () { return subGoalsExist; };

    return {
      getQuantifiable: getQuantifiable,
      setQuantifiable: setQuantifiable,
      getGoalDetail: getGoalDetail,
      setGoalDetail: setGoalDetail,
      getUpdateGoal: getUpdateGoal,
      setUpdateGoal: setUpdateGoal,
      getSubGoalsExist: getSubGoalsExist,
      setSubGoalsExist: setSubGoalsExist,
    };
  };
})();