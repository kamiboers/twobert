var $ = require('jQuery');

function EndGame(score, qlives, twolives) {
  this.endMenu = $("#end-menu");
  this.score = score;
  this.qlives = qlives;
  this.twolives = twolives;
}

EndGame.prototype.end = function(){
  this.finalScores();
  $('#p1-score').text("PLAYER 1: " + this.score.player1);
  $('#p2-score').text("PLAYER 2: " + this.score.player2);
  if (this.score.player1 > this.score.player2) {
    $('#winner').text("PLAYER 1 WINS!");
    var highScore = this.score.player1
  } else {
    var highScore = this.score.player2
    $('#winner').text("PLAYER 2 WINS!");
  }
  $('#score-form').show();
  $('#top-scores').hide();
  this.endMenu.fadeIn('slow', function(){clearCharacter();});
};

EndGame.prototype.finalScores = function() {
  this.score.increase(50*this.qlives, 1);
  this.score.increase(50*this.twolives, 2);
}

function clearCharacter(){
  var canvas  = document.getElementById("charCanvas");
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}

module.exports = EndGame;
