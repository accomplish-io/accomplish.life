module.exports = function(req, res) {
  var text = generateGoalAdvice();
  if (req.body.results.metadata.intentName === 'Encourage') {
    text = generateQuote();
  }
  var response = {
    "speech": "You did it!",
    "displayText": "woot woot!",
    "data": {},
    "contextOut": [],
    "source": "accomplish.life"
  };
  res.send(response);
}

function generateQuote() {
  var quotes = [
    "The longer I live, the more I realize the impact of attitude on life. Attitude, to me, is more important than facts. It is more important than the past, than education, than money, than circumstances, than failures, than successes, than what other people think or say or do. It is more important than appearance, giftedness, or skill. It will make or break a company ... a church ... a home. The remarkable thing is we have a choice every day regarding the attitude we will embrace for that day. We cannot change the inevitable. The only thing we can do is play on the one string we have, and that is our attitude ... I am convinced that life is 10% what happens to me, and 90% how I react to it. And so it is with you ... we are in charge of our Attitudes. -Charles Swindoll",
    "It must be borne in mind that the tragedy of life doesn’t lie in not reaching your goal. The tragedy lies in having no goal to reach. It isn’t a calamity to die with dreams unfulfilled, but it is a calamity not to dream. It is not a disaster to be unable to capture your ideal, but it is a disaster to have no ideal to capture. It is not a disgrace not to reach the stars, but it is a disgrace to have no stars to reach for. Not failure, but low aim is sin. ― Benjamin Elijah Mays",
    "The future's always looked bleak until people with brains and faith and courage dreamed and dared to take risks found a way to make it better. If we're free to dare-and we are- if we're free to give- and we are- then we are free to shape the future and have within our grasp all that we dream that future will be. - Ronald Reagan",
    "What is success? To laugh often and much; to win the respect of intelligent people and the affection of children; to earn the appreciation of honest critics and endure the betrayal of false friends; to appreciate the beauty; to find the best in others; to leave the world a bit better, whether by a healthy child, a garden patch Or a redeemed social condition; to know even one life has breathed easier because you have lived. This is to have succeeded! ― Ralph Waldo Emerson"
    "It is not the critic who counts, not the man who points out how the strong man stumbled, or where the doer of deeds could have done better. The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood, who strives valiantly, who errs and comes short again and again, who knows the great enthusiasms, the great devotions, and spends himself in a worthy cause, who at best knows achievement and who at the worst if he fails at least fails while daring greatly so that his place shall never be with those cold and timid souls who know neither victory nor defeat. - Theodore Roosevelt",
    "The best way to relieve nervousness about a deadline is to do something to work towards finishing it.",
    "Write down five things you're excited about. There's your priorities. If you don't have five things you're excited about, you priority is finding them.",
    "When you live your life out of memory, you live out of your history. This is what once was. When you live your life out of your imagination, you live out of the potential you have. This is what can be."
  ];
  var index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function generateGoalAdvice() {
  var goalAdvice = [
    'Write your goal down.',
    "Be sure to ask yourself what resources you would need to complete your goal.",
    "Make your goals SMART; Let them be specific, measurable, attainable, realistic, and time oriented.",
    "Think about when and where you will complete your goal.",
    "Have a set time frame to complete your goal. The start time is as important as the end time.",
    "Use words like 'I will'. Never say 'I will try'.",
    "Figure out what’s holding you back from your goals: fear of rejection, having to be perfect, lack of focus, low self-esteem and break it, get rid of it. Don’t live your life under those things anymore.",

  ];
  var index = Math.floor(Math.random() * goalAdvice.length);
  return goalAdvice[index];
}
