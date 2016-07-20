var Cube = require('./cube');

function Board(params) {
  this.cubes = [];
  this.level = params['level'];
  this.context = params['context'];
  this.qbert = params['qbert'];
  this.score = params['score'];
}

Board.prototype.initializeCubes = function() {
  for(var rowCount= 0; rowCount< 7; rowCount++){
    for(var cubeNumber = 0; cubeNumber <= rowCount; cubeNumber++) {
      var cubeAttributes = this.assignCubeParams(325, 60, rowCount, cubeNumber);
      var cube = new Cube(cubeAttributes);
      this.cubes.push(cube);
    }
  }
};

Board.prototype.drawCubes = function(){
  this.cubes.forEach(function(cube){
    cube.drawCube();
  });
};

Board.prototype.assignCubeParams = function(originX, originY, rowCount, cubeNumber){
  return {
    id: this.cubes.length,
    x: originX - rowCount*40 + cubeNumber*80,
    y: originY + rowCount*60,
    upLeftId: cubeNumber > 0 ? this.cubes.length - rowCount- 1 : null,
    upRightId: cubeNumber < rowCount? this.cubes.length - rowCount: null,
    downLeftId: this.cubes.length + (rowCount+ 1) <= 27 ? this.cubes.length + (rowCount+ 1) : null,
    downRightId: this.cubes.length + (rowCount+ 2) <= 27 ? this.cubes.length + (rowCount+ 2) : null,
    context: this.context
  };
};

Board.prototype.drawScoreBoard = function() {
  var scoreDiv = document.getElementById('scoreboard');
  scoreDiv.innerHTML= "Score: " + this.score.total;
};

Board.prototype.activateCube = function(id){
    this.score.increase(25);
    this.cubes[id].active = true;
    this.cubes[id].drawCube();
};

module.exports = Board;
