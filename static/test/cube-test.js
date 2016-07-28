var assert = require('chai').assert;
var Cube = require('../lib/cube');

describe('Cube', function(){
  context('attributes without params', function(){
    var cube = new Cube({});

    it('defaults status to inactive', function(){
      assert.equal(cube.active, false);
    });
  });

  context('attributes with params', function(){
    var params = {
      id:           1,
      x:            45,
      y:            10,
      upLeftId:     null,
      upRightId:    0,
      downLeftId:   3,
      downRightId:  4
    };

    var cube = new Cube(params);

    cube.active = true;
    
    it("has an id", function(){
      assert.equal(cube.active, true);
    });
    it("has an x", function(){
      assert.equal(cube.x, 45);
    });
    it("has an y", function(){
      assert.equal(cube.y, 10);
    });
    it("has an upLeftId", function(){
      assert.equal(cube.upLeftId, null);
    });
    it("has an upRightId", function(){
      assert.equal(cube.upRightId, 0);
    });
    it("has an downLeftId", function(){
      assert.equal(cube.downLeftId, 3);
    });
    it("has an downRightId", function(){
      assert.equal(cube.downRightId, 4);
    });
  });
});
