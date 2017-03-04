module.exports = function(req, res) {
  res.send({
    "speech": "You did it!",
    "displayText": "woot woot!",
    "data": {"things": "and such"},
    "contextOut": [],
    "source": "ME!"
  });
}