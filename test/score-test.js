var assert = require('chai').assert;
var Score = require('../lib/score');

describe('Score', function(){
  context('when initialized', function(){
    var score = new Score({});

    it('defaults to a total of zero', function(){
      assert.equal(score.total, 0);
    });
  
  });

  context('increments', function(){
	var score = new Score({});

    it('increments by any amount', function(){
      score.increase(25);
      assert.equal(score.total, 25);
      score.increase(100);
      assert.equal(score.total, 125);
    });

  });

  context('resets', function(){
	var score = new Score({});

    it('is zero after reset', function(){
      score.increase(100);
      assert.equal(score.total, 100);
      score.reset();
      assert.equal(score.total, 0);
    });

  });

});
