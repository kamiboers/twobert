var Game = require('./game');
var game = new Game();
var $    = require('jQuery');

var startMenu     = $("#start-menu");
var endMenu       = $("#end-menu");
var startButton   = document.getElementById("start-button");
var restartButton = document.getElementById("restart-button");
var initialsButton = document.getElementById("initials-button");
var topScores      = document.getElementById("top-scores");
var topScoresMenu   = $("#top-scores");
var scoreForm      = $("#score-form");

startButton.addEventListener('click', function(){
  startMenu.fadeOut('slow');
  game.startGame();
  game.setInput();
});

restartButton.addEventListener('click', function() {
  game.resetGame();
  endMenu.fadeOut('slow');
});

initialsButton.addEventListener('click', function(){
  var input = {
    'player': $('#initials').val(),
    'totalScore': $('#game-score').text()
  };

  var standings = currentTopScores();
  addCurrentGame(input, standings);
  sortTopGames(standings);
  displayTopScores();

});

function currentTopScores() {
  var standings = localStorage.getItem('games') || '[]';
  return JSON.parse(standings);
}

function addCurrentGame(input, standings) {
  if(input.player !== ""){
    standings.push(input);
    localStorage.setItem('games', JSON.stringify(standings));
  }
}

function sortTopGames(standings) {
  var games = standings.sort(function(a, b){
    return b.totalScore - a.totalScore;
  }).slice(0, 5);

  var data = "<h4>TOP SCORES</h4><table id='scores-table'><tr><td></td><td></tr>";

  games.forEach(function(game){
    data += "<tr><td class='names-col'>" + game.player + "</td><td class='scores-col'> " + game.totalScore + "</td></tr>";
  });

  data += '</table>';
  topScores.innerHTML = data;
}

function displayTopScores() {
  scoreForm.fadeOut('fast');
  topScoresMenu.fadeIn('slow');
  $('#initials').val("");
}