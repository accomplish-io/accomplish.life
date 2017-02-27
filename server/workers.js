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
