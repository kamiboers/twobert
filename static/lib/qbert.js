function Qbert(params) {
  this.lives            = 3;
  this.currentPosition  = 0;
  this.nextPosition     = 0;
  this.board            = params['board'];
  this.x                = 325;
  this.y                = 60;
  this.targetX          = 0;
  this.xVelocity        = 0;
  this.yVelocity        = 0;
  this.context          = params['context'];
  this.jumping          = false;
  this.alive            = true;
}

Qbert.prototype.update = function() {
  if (this.nextPosition === null && this.y < 620) {
    // add method to pull out this logic
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.yVelocity += 0.5;
  } else if (this.nextPosition === null && this.y > 620) {
    this.die();
  } else if (this.x !== this.targetX) {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if(this.jumping === true) {
      this.yVelocity += 0.5;
    }
  } else {
    this.jumping         = false;
    this.xVelocity       = 0;
    this.yVelocity       = 0;
    this.currentPosition = this.nextPosition;

    if ( this.board.cubes[this.currentPosition].active === false ) {
      this.board.activateCube(this.currentPosition);
    }
  }
};

Qbert.prototype.draw = function() {
  this.context.fillStyle = '#ff66ff';
	this.context.fillRect(this.x-10, this.y-10, 20, 20);
};

Qbert.prototype.die = function(){
  this.lives--;
  this.jumping         = false;
  this.x               = 325;
  this.y               = 60;
  this.xVelocity       = 0;
  this.yVelocity       = 0;
  this.currentPosition = 0;
  this.nextPosition    = 0;
};

Qbert.prototype.setBoard = function(board) {
  this.board = board;
};

Qbert.prototype.onCube = function(){
    return this.board.cubes[this.currentPosition] || this.board.cubes[0];
};

Qbert.prototype.upRight = function() {
    if (this.jumping === false){
      this.targetX   = this.x + 40;
      this.xVelocity = +2;
      this.yVelocity = -7.75;
      this.jumping   = true;
      this.nextPosition = this.onCube().upRightId;
    }
};

Qbert.prototype.upLeft = function() {
  if (this.jumping === false){
    this.targetX   = this.x - 40;
    this.xVelocity = -2;
    this.yVelocity = -7.75;
    this.jumping   = true;
    this.nextPosition = this.onCube().upLeftId;
  }
};

Qbert.prototype.downLeft = function() {
  if (this.jumping === false){
    this.targetX   = this.x - 40;
    this.xVelocity = -2;
    this.yVelocity = -1.75;
    this.jumping = true;
    this.nextPosition = this.onCube().downLeftId;
  }
};

Qbert.prototype.downRight = function() {
  if (this.jumping === false){
    this.targetX   = this.x + 40;
    this.xVelocity = +2;
    this.yVelocity = -1.75;
    this.jumping = true;
    this.nextPosition = this.onCube().downRightId;
  }
};

module.exports = Qbert;
