function Score() {
	this.total = 0;
}

Score.prototype.increase = function(n) {
	this.total += n;
};

Score.prototype.reset = function(){
	this.total = 0;
};

module.exports = Score;
