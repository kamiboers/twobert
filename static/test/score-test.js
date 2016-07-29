var assert = require('chai').assert;
var Score = require('../lib/score');

describe('Score', function(){
  context('when initialized', function(){
    var score = new Score({});

    it('defaults both players to a total of zero', function(){
      assert.equal(score.player1, 0);
      assert.equal(score.player2, 0);
    });
  
  });

  context('increments', function(){
	var score = new Score({});

    it('increments by any amount', function(){
      score.increase(25, 1);
      assert.equal(score.player1, 25);
      score.increase(100, 1);
      assert.equal(score.player1, 125);
    });

  });

  context('resets', function(){
	var score = new Score({});

    it('is zero after reset', function(){
      score.increase(100, 1);
      score.increase(12, 2);
      assert.equal(score.player1, 100);
      assert.equal(score.player2, 12);
      score.reset();
      assert.equal(score.player1, 0);
      assert.equal(score.player2, 0);
    });

  });

});
