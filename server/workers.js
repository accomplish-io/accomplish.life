var autoComplete = function(progresses) {
  var progressTotal = progresses.reduce(function(memo, item) {
    return memo + item.number;
  }, 0)

  return progressTotal;
}

module.exports = {
  autoComplete: autoComplete
}

// o: if progress >= goal number, make goal complete true
// i: array of objects with a number param
// c: none
// e: [2,4,3,1,4,2] && goal.number is 20 === still incomplete
//    [2,4,3,1,4,2] && goal.number is 16 === goal is complete
