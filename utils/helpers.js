

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
  randomId: randomId,
  firstTwoMatch: firstTwoMatch
};