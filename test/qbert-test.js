var assert = require('chai').assert;
var Qbert = require('../lib/qbert');
var Board = require('../lib/board');

describe('Qbert', function(){
	context('when initialized', function(){
		var qbert = new Qbert({});

		it('defaults to the top cube', function(){
			assert.equal(qbert.currentPosition, 0);
		});

		it('defaults to no next position', function(){
			assert.equal(qbert.nextPosition, 0);
		});

		it('initializes with 3 lives', function(){
			assert.equal(qbert.lives, 3);
		});

	});

	context('on board', function(){
		var board = new Board({});
		board.initializeCubes();
		var qbert = new Qbert({board: board});

		it('moves down right', function(){
			qbert.downRight();
			assert.equal(qbert.nextPosition, 2);
		});
	});

	context('on board again', function(){
		var board = new Board({});
		board.initializeCubes();
		var qbert = new Qbert({board: board});

		it('moves down right', function(){
			qbert.currentPosition = 13
			qbert.upLeft();
			assert.equal(qbert.nextPosition, 8);
		});
	});

	context('on board yet again', function(){
		var board = new Board({});
		board.initializeCubes();
		var qbert = new Qbert({board: board});

		it('moves down left', function(){
			qbert.downLeft();
			assert.equal(qbert.nextPosition, 1);
		});
	});

	context('clearly the tests are not resetting', function(){
		var board = new Board({});
		board.initializeCubes();
		var qbert = new Qbert({board: board});

		it('moves up right', function(){
			qbert.currentPosition = 13
			qbert.upRight();
			assert.equal(qbert.nextPosition, 9);
		});

	});

});
