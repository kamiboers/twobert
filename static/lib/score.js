function Score() {
  this.player1 = 0;
  this.player2 = 0;
}

Score.prototype.increase = function(n, player) {
  if (player == 1) {
    this.player1 += n;
  } else {
    this.player2 += n;
  }
};

Score.prototype.reset = function(){
  this.player1 = 0;
	this.player2 = 0;
};

module.exports = Score;
