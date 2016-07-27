function Qbert(params) {
  this.lives            = 3;
  this.currentPosition  = params['position'] || 0;
  this.nextPosition     = params['position'] || 0;
  this.board            = params['board'];
  this.x                = params['x'] || 325;
  this.y                = params['y'] || 60;
  this.targetX          = 0;
  this.xVelocity        = 0;
  this.yVelocity        = 0;
  this.context          = params['context'];
  this.jumping          = false;
  this.alive            = true;
  this.identity              = params['num'];
  this.dying            = false;
}

Qbert.prototype.update = function() {
  if (this.nextPosition === null && this.y < 620) {
    // add method to pull out this logic
    this.dying = true;
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
      this.board.activateCube(this.currentPosition, this.identity);
    }
  }
};

Qbert.prototype.draw = function() {
  if (this.dying) {
    this.drawBubble(this.x+15, this.y-20, 138, 20, 10)
  }
  if (this.identity == 1) {
    this.context.lineWidth=5;
  this.context.strokeStyle = '#ffccff'
  this.context.strokeRect(this.x-10, this.y-10, 20, 20)
  this.context.fillStyle = '#ff66ff';
  } else {
  this.context.lineWidth=5;
  this.context.strokeStyle = '#00ff00'
  this.context.strokeRect(this.x-10, this.y-10, 20, 20)
    this.context.fillStyle = '#33cc33'
  }
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
  this.dying           = false;
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

Qbert.prototype.drawBubble = function(x, y, w, h, radius, text) {
    var r = x + w;
    var b = y - h;
    this.context.beginPath();
    this.context.strokeStyle = "white";
    this.context.lineWidth = "5";

    var handle = {
        x1: x + radius,
        y1: y,
        x2: x + radius / 2,
        y2: y + 10,
        x3: x + radius * 2,
        y3: y
    }
    this.context.moveTo(handle.x1, handle.y1);
    this.context.lineTo(handle.x2, handle.y2);
    this.context.lineTo(handle.x3, handle.y3);

    this.context.lineTo(r - radius, y);
    this.context.quadraticCurveTo(r, y, r, y - radius);
    this.context.lineTo(r, y - h + radius);
    this.context.quadraticCurveTo(r, b, r - radius, b);
    this.context.lineTo(x + radius, b);
    this.context.quadraticCurveTo(x, b, x, b + radius);
    this.context.lineTo(x, b + radius);
    this.context.quadraticCurveTo(x, y, x + radius, y);
    this.context.stroke();
    this.context.fillStyle = "white";
    this.context.fill();

    this.context.font = "18px Comic Sans MS";
    this.context.fillStyle = "red";

    this.context.fillText('motherfucker!', x+10, y-5);

    return handle;
};

// Qbert.prototype.setMessage = function() {
//   var messages =  [ "fuck",
//                     // "&$#@*&@",
//                     // "farewell",
//                     // "agh!",
//                     // "I'M EVERY WOMAN!!! IT'S ALL IN MEEEEEEEEEEEE!!! ANYTHING YOU WANT DONE BABY I'LL DO IT NATURALLY!!! (OHH OHH OOOHHHH)"
//                   ];

//   return messages[Math.floor(Math.random() * messages.length)]
// };


module.exports = Qbert;
