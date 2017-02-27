var compareToTarget = function(progresses, target) {
  var progressTotal = progresses.reduce(function(memo, item) {
    return memo + item.number;
  }, 0);

  if (progressTotal >= target.number) {
    return true;
  }

  return false;
}

module.exports = {
  compareToTarget: compareToTarget
}

// o: if progress >= goal number, make goal complete true
// i: array of objects with a number param
// c: none
// e: [2,4,3,1,4,2] && goal.number is 20 === still incomplete
//    [2,4,3,1,4,2] && goal.number is 16 === goal is complete
