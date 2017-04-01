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


module.exports = {
  isUserLoggedIn: isUserLoggedIn,
  randomId: randomId
};