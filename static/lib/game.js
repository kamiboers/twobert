var $ = require('jQuery');
var Board       = require('./board');
var Qbert       = require('./qbert');
var Ball        = require('./ball');
var UserInput   = require('./user_input');
var Draw        = require('./draw');
var Score       = require('./score');

function Game() {
  this.bgCanvas    = document.getElementById('bgCanvas');
  this.charCanvas  = document.getElementById("charCanvas");
  this.bgContext   = this.bgCanvas.getContext('2d');
  this.charContext = this.charCanvas.getContext('2d');
  this.score       = new Score();
  this.board       = new Board({context: this.bgContext, score: this.score});
  this.qbert       = new Qbert({context: this.charContext, board: this.board, num: 1, position: 21, x: 85, y: 420});
  this.twobert     = new Qbert({context: this.charContext, board: this.board, num: 2, position: 27, x: 565, y: 420})
  this.ball        = new Ball({context: this.charContext, board: this.board});
  this.draw        = new Draw({qbert:   this.qbert,
                               twobert: this.twobert,
                               context: this.charContext,
                               canvas:  this.charCanvas,
                               board:   this.board,
                               score:   this.score,
                               game:    this
                             });
}

Game.prototype.setInput = function() {
  var input = new UserInput({level:  this.board,
                            player:  this.qbert,
                            player2: this.twobert,
                            context: this.charContext,
                            canvas:  this.charCanvas
                          });
  input.setInput();

  var viewWidth = document.documentElement.clientWidth;
  var viewHeight = document.documentElement.clientHeight;
  console.log("width: " + viewWidth + " height: " + viewHeight);
  console.log(viewWidth < viewHeight);

  if(viewWidth < viewHeight) {
    input.setMobileInput();
  }
};

Game.prototype.startGame = function() {
  this.board.initializeCubes();
  this.board.drawCubes();
  var thisDraw = this.draw;
  window.requestAnimationFrame(function(){thisDraw.drawFrame();});
};

Game.prototype.resetGame = function() {
  this.resetCubes();
  this.resetLives();
  this.resetQbert();
  this.resetTwobert();
  this.resetCharacters();
  this.resetScore();
  this.resetDifficulty();
  this.resetTick();
  this.resetScoreboard();
  this.reanimate();
};

Game.prototype.resetLevel = function() {
  this.resetCubes();
  this.resetQbert();
  this.resetTwobert();
  this.resetCharacters();
  this.resetTick();
  this.celebrate();
};

Game.prototype.celebrate = function() {
  var messages =  [ "AWWWW YEAH!!!",
                    "YOU DID IT!!!",
                    "SWEET HOME ALABAMA!!!",
                    "WOOT!!!",
                    "YAY!!!",
                    "ROCKIN' ROBIN!!!",
                    "HURRAH!!!",
                    "JIMINY CRICKETS!!!",
                    "I AIN'T NEVER SCARED!!!",
                    "R-E-S-P-E-C-T",
                    "VALAR MORGHULIS!!!",
                    "WINTER IS HERE!!!",
                    "WE OUT HERE!!!",
                    "JIMENY CRICKETS!!!",
                    "I'M EVERY WOMAN!!! IT'S ALL IN MEEEEEEEEEEEE!!! ANYTHING YOU WANT DONE BABY I'LL DO IT NATURALLY!!! (OHH OHH OOOHHHH)"
                  ];
   $('#fireworks').show();
   $('#congrats').text(messages[Math.floor(Math.random() * messages.length)]);
   setTimeout(function() { 
       $('#fireworks').fadeOut(); 
       $('#congrats').text("");
   }, 3000);
};

Game.prototype.resetCubes = function(){
  this.board.cubes.forEach(function(cube){
    cube.active = false;
  });
  this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
  this.board.drawCubes();
};

Game.prototype.resetLives = function() {
  this.qbert.lives = 3;
  this.twobert.lives = 3;
};

Game.prototype.resetQbert = function() {
  this.qbert.currentPosition  = 21;
  this.qbert.nextPosition     = 21;
  this.qbert.x                = 85;
  this.qbert.y                = 420;
  this.qbert.targetX          = 0;
  this.qbert.xVelocity        = 0;
  this.qbert.yVelocity        = 0;
  this.qbert.jumping          = false;
  this.qbert.dying            = false;
};

Game.prototype.resetTwobert = function() {
  this.twobert.currentPosition  = 27;
  this.twobert.nextPosition     = 27;
  this.twobert.x                = 565;
  this.twobert.y                = 420;
  this.twobert.targetX          = 0;
  this.twobert.xVelocity        = 0;
  this.twobert.yVelocity        = 0;
  this.twobert.jumping          = false;
  this.twobert.dying            = false;
};

Game.prototype.resetCharacters = function(){
  this.draw.characters = [this.qbert, this.twobert];
  this.draw.enemies    = [];
  this.qbert.setBoard(this.board);
  this.twobert.setBoard(this.board);
};

Game.prototype.reanimate = function(){
  var self = this;
  window.requestAnimationFrame(function() {
    self.draw.drawFrame();
  });
};

Game.prototype.resetScore = function(){
  this.score.reset();
};

Game.prototype.resetDifficulty = function() {
  this.draw.level     = 1;
  this.draw.enemyFreq = 500;
};

Game.prototype.resetTick = function(){
  this.draw.tick = 0;
};

Game.prototype.resetScoreboard = function(){
  var scoreDiv = document.getElementById("scoreboard");
  scoreDiv.innerHTML = "";
};

module.exports = Game;
