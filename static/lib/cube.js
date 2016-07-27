function Cube(params) {
  this.active       = false;
  this.id           = params["id"];
  this.x            = params["x"];
  this.y            = params["y"];
  this.upLeftId     = params["upLeftId"];
  this.upRightId    = params["upRightId"];
  this.downLeftId   = params["downLeftId"];
  this.downRightId  = params["downRightId"];
  this.context      = params['context'];
}

Cube.prototype.drawCube = function(player){
  var topColor = this.setTopColor(player);
  this.drawTopSurface(topColor);
  this.drawLeftSurface();
  this.drawRightSurface();
};

Cube.prototype.setTopColor = function(player) {
  if (player == 1) {
    return this.active === true ? '#FFCC46' : '#3B6D80';
  } else if (player == 2) {
    return this.active === true ? '#33ccff' : '#3B6D80';
  } else {
    return '#3B6D80';
  }
};

Cube.prototype.drawRightSurface = function() {
  this.context.beginPath();
  this.context.moveTo(this.x, this.y+20);
  this.context.lineTo(this.x, this.y+70);
  this.context.lineTo(this.x+40, this.y+60);
  this.context.lineTo(this.x+40, this.y+10);
  this.context.fillStyle="#47528B";
  this.context.fill();
};

Cube.prototype.drawLeftSurface = function() {
  this.context.beginPath();
  this.context.moveTo(this.x, this.y+20);
  this.context.lineTo(this.x, this.y+70);
  this.context.lineTo(this.x-40, this.y+60);
  this.context.lineTo(this.x-40, this.y+10);
  this.context.fillStyle="#529A68";
  this.context.fill();
};

Cube.prototype.drawTopSurface = function(topColor) {
  this.context.beginPath();
  this.context.moveTo(this.x, this.y);
  this.context.lineTo(this.x+40, this.y+10);
  this.context.lineTo(this.x, this.y+20);
  this.context.lineTo(this.x-40, this.y+10);
  this.context.fillStyle= topColor;
  this.context.fill();
};

module.exports = Cube;
