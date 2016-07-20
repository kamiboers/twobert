function UserInput(params){
  this.player  = params['player'];
  this.context = params['context'];
  this.canvas  = params['canvas'];
}

UserInput.prototype.setInput = function() {
  window.addEventListener("keydown", keyPress, false);
  window.addEventListener("keyup", keyRelease, false);

  var player  = this.player;
  var context = this.context;
  var canvas  = this.canvas;
  var tKey    = document.getElementById("t");
  var yKey    = document.getElementById("y");
  var gKey    = document.getElementById("g");
  var hKey    = document.getElementById("h");

  function keyPress(e) {
    var code = e.keyCode;
    if (code === 72) {
      player.downRight();
      hKey.style.backgroundColor = '#47528B';
    } else if (code === 71) {
      player.downLeft();
      gKey.style.backgroundColor = '#47528B';
    } else if (code === 84) {
      player.upLeft();
      tKey.style.backgroundColor = '#47528B';
    } else if (code === 89) {
      player.upRight();
      yKey.style.backgroundColor = '#47528B';
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
  }

  function keyRelease(e) {
    var code = e.keyCode;

    if (code === 72) {
      hKey.style.backgroundColor = 'black';
    } else if (code === 71) {
      gKey.style.backgroundColor = 'black';
    } else if (code === 84) {
      tKey.style.backgroundColor = 'black';
    } else if (code === 89) {
      yKey.style.backgroundColor = 'black';
    }
  }
};

UserInput.prototype.setMobileInput = function() {
  var mobile = document.getElementById('mobile-controls');
  mobile.style.display = 'block';
  var upLeft = document.getElementById('mobile-UL');
  var upRight = document.getElementById('mobile-UR');
  var downLeft = document.getElementById('mobile-DL');
  var downRight = document.getElementById('mobile-DR');
  var player = this.player;

  console.log(upRight);

  upLeft.addEventListener('click', function(){player.upLeft();}, false);
  upRight.addEventListener('click', function() {player.upRight();}, false);
  downLeft.addEventListener('click', function() {player.downLeft();}, false);
  downRight.addEventListener('click', function() {player.downRight();}, false);
};

module.exports = UserInput;
