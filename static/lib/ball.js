var enemyPosition = require('./enemy_position');

function Ball(params) {
  this.newPosition      = enemyPosition();
  this.currentPosition  = this.newPosition.position;
  this.nextPosition     = this.newPosition.position;
  this.board            = params['board'];
  this.x                = this.newPosition.x;
  this.y                = 120;
  this.targetX          = 0;
  this.xVelocity        = 0;
  this.yVelocity        = 0;
  this.context          = params['context'];
  this.jumping          = false;
  this.moveInterval     = 50;
  this.alive            = true;
}

Ball.prototype.update = function(tick) {
  if(this.timeToMove(tick)){
    this.move();
  }
  if (this.jumpingOffBoard()) {
    this.setPosition(this.xVelocity, this.yVelocity);
    this.fall();
  } else if (this.hasLeftScreen()) {
    this.die();
  } else if (this.inTransit()) {
    this.setPosition(this.xVelocity, this.yVelocity);
    if(this.jumping === true) {
      this.fall();
    }
  } else {
    this.stop();
  }
};

Ball.prototype.getYPosition = function() {
  return this.onCube.y;
};

Ball.prototype.timeToMove = function(tick) {
  return tick % this.moveInterval === 0;
};

Ball.prototype.jumpingOffBoard = function() {
  return this.nextPosition === null && this.y < 620;
};

Ball.prototype.hasLeftScreen = function() {
  return this.nextPosition === null && this.y > 620;
};

Ball.prototype.setPosition = function(x, y) {
  this.x += x;
  this.y += y;
};

Ball.prototype.fall = function() {
  this.yVelocity += 0.5;
};

Ball.prototype.inTransit = function() {
  return this.x !== this.targetX;
};

Ball.prototype.onCube = function(){
  return this.board.cubes[this.currentPosition] || this.board.cubes[0];
};

Ball.prototype.stop = function(){
    this.jumping         = false;
    this.xVelocity       = 0;
    this.yVelocity       = 0;
    this.currentPosition = this.nextPosition;
};

Ball.prototype.draw = function() {
  this.context.fillStyle = 'crimson';
	this.context.beginPath();
  this.context.arc(this.x, this.y-10, 15, 0, 2 * Math.PI, false);
  this.context.fill();
};


Ball.prototype.move = function(){
  var chance = Math.random();
  if (chance > 0.5) {
    this.downLeft();
  } else {
    this.downRight();
  }
};

Ball.prototype.die = function(){
  this.jumping = false;
  this.alive   = false;
};

Ball.prototype.downLeft = function() {
  this.targetX   = this.x - 40;
  this.xVelocity = -2;
  this.yVelocity = -1.75;
  this.jumping = true;
  this.nextPosition = this.onCube().downLeftId;
};

Ball.prototype.downRight = function() {
  this.targetX   = this.x + 40;
  this.xVelocity = +2;
  this.yVelocity = -1.75;
  this.jumping = true;
  this.nextPosition = this.onCube().downRightId;
};

module.exports = Ball;
