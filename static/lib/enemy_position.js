var enemyPosition = function(){
  var newPosition = null;
  var newX        = null;

  var chance = Math.random();
  if (chance > 0.5) {
    newPosition = 1;
    newX        = 285;
  } else {
    newPosition = 2;
    newX        = 365;
  }
  return { position: newPosition, x: newX };
};

module.exports = enemyPosition;
