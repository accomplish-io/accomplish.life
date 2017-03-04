module.exports = function(req, res) {
  var response = {
    "speech": "You did it!",
    "displayText": "woot woot!",
    "data": {},
    "contextOut": [],
    "source": "ME!"
  };
  console.log(response)
  res.send(response);
}