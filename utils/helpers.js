// User denial function
function isUserLoggedIn(req, res) {
  if (!req.session.user_id) {
    req.flash("error", "You must login to play around with the todos");
    res.json({error: req.flash("error")});
    return;
  }
}

// Generate a random user id for demo
function randomId() {
  return Math.ceil(Math.random() * 100);
}

function firstTwoMatch(rowsArr) {
  if(!rowsArr[1]) return false;
  if (rowsArr[0].hits === rowsArr[1].hits) {
    return true;
  }
  return false;
}
module.exports = {
  isUserLoggedIn: isUserLoggedIn,
  randomId: randomId,
  firstTwoMatch: firstTwoMatch
};