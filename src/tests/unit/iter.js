/*
  @name:         iter tests

  @description:  specs for the core iteration module

  @author:       Simon Jefford
  
*/
var iter = require("iter");

describe("iter", function() {

  var arr, obj, iterable;

  beforeEach(function() {

    arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    obj = {
      who: "simple simon",
      what: "met a pieman",
      doing: "going to the fair"
    };
    iterable = {

      k1: "v1",
      k2: "v2",
      k3: "v3",
      k4: "v4",
      k5: "v5",
      k6: "v6",
      k7: "v7",
      k8: "v8",

      __iterator__: function() {
        var that = this, i = 1;
        return {
          next: function() {
            var v = that["k" + i],
                r = [v, "k" + i];
            if(typeof v === "undefined") {
              throw StopIteration;
            }
            i = i + 2;
            return r;
          }
        };
      }
    };

  });

  afterEach(function() {

    arr = null;
    obj = null;
    iterable = null;

  });


  it("iter#forEach should fire for every item in an array", function() {
    
    var spy = sinon.spy();
    iter.forEach(arr, spy);

    expect(spy.callCount).toEqual(10);

  });

  it("iter#forEach should fire for every item in an object", function() {
    
    var spy = sinon.spy();
    iter.forEach(obj, spy);

    expect(spy.callCount).toEqual(3);

  });

  it("iter#forEach should fire for every item in an iterable", function() {
    
    var spy = sinon.spy();
    iter.forEach(iterable, spy);

    expect(spy.callCount).toEqual(4);

  });

  it("iter#filter should return a filtered array", function() {
    
    var f = iter.filter(arr, function(v, k) {
      return (v < 7);
    });

    expect(f.length).toEqual(7);

  });

  it("iter#filter should return a filtered object", function() {
    
    var f = iter.filter(obj, function(v, k) {
      return (/simon/.test(v));
    });

    expect(f.who).toEqual("simple simon");
    expect(f.what).toEqual(undefined);
    expect(f.doing).toEqual(undefined);

  });

  it("iter#filter should return a filtered iterable", function() {
    
   var f = iter.filter(iterable, function(v, k) {
      return (/v3/.test(v));
    });

    expect(f.k1).toEqual(undefined);
    expect(f.k3).toEqual("v3");
    expect(f.k5).toEqual(undefined);
    expect(f.k7).toEqual(undefined);

  });


  it("iter#map should map an array", function() {
    
    var f = iter.map(arr, function(v, k) {
      return v * 2;
    });

    expect(f[0]).toEqual(0);
    expect(f[1]).toEqual(2);
    expect(f[2]).toEqual(4);
    expect(f[3]).toEqual(6);
    expect(f[4]).toEqual(8);
    expect(f[5]).toEqual(10);
    expect(f[6]).toEqual(12);
    expect(f[7]).toEqual(14);
    expect(f[8]).toEqual(16);
    expect(f[9]).toEqual(18);

  });

  it("iter#map should map an object", function() {
    
    var f = iter.map(obj, function(v, k) {
      return (v + ":" + v);
    });

    expect(f.who).toEqual("simple simon:simple simon");
    expect(f.what).toEqual("met a pieman:met a pieman");
    expect(f.doing).toEqual("going to the fair:going to the fair");

  });

  it("iter#map should map an iterable", function() {
    
   var f = iter.map(iterable, function(v, k) {
      return (v + ":" + v);
    });

    expect(f.k1).toEqual("v1:v1");
    expect(f.k3).toEqual("v3:v3");
    expect(f.k5).toEqual("v5:v5");
    expect(f.k7).toEqual("v7:v7");

  });


  it("iter#some should return true if one array item is true", function() {
    
    var f = iter.some(arr, function(v, k) {
      return (v === 5);
    });

    expect(f).toEqual(true);

  });

  it("iter#some should return false if no array items are true", function() {
    
    var f = iter.some(arr, function(v, k) {
      return (v === 50);
    });

    expect(f).toEqual(false);

  });

  it("iter#some should return true if one object value is true", function() {
    
    var f = iter.some(obj, function(v, k) {
      return (v === "met a pieman");
    });

    expect(f).toEqual(true);

  });

  it("iter#some should return false if no no object values are true", function() {
    
    var f = iter.some(obj, function(v, k) {
      return (v === "not found");
    });

    expect(f).toEqual(false);

  });

  it("iter#some should return true if one iterable value is true", function() {
    
    var f = iter.some(iterable, function(v, k) {
      return (v === "v7");
    });

    expect(f).toEqual(true);

  });

  it("iter#some should return false if no iterable values are true", function() {
    
    var f = iter.some(iterable, function(v, k) {
      return (v === "not found");
    });

    expect(f).toEqual(false);

  });


  it("iter#every should return true if every array item is true", function() {
    
    var f = iter.every(arr, function(v, k) {
      return (v !== 50);
    });

    expect(f).toEqual(true);

  });

  it("iter#every should return false if one array item is false", function() {
    
    var f = iter.every(arr, function(v, k) {
      return (v === 50);
    });

    expect(f).toEqual(false);

  });

  it("iter#every should return true if every object value is true", function() {
    
    var f = iter.every(obj, function(v, k) {
      return (typeof v === "string");
    });

    expect(f).toEqual(true);

  });

  it("iter#every should return false if one object value is false", function() {
    
    var f = iter.every(obj, function(v, k) {
      return (v === "not found");
    });

    expect(f).toEqual(false);

  });

  it("iter#every should return true if one iterable value is true", function() {
    
    var f = iter.every(iterable, function(v, k) {
      return (typeof v === "string");
    });

    expect(f).toEqual(true);

  });

  it("iter#every should return false if no iterable values are true", function() {
    
    var f = iter.every(iterable, function(v, k) {
      return (v === "not found");
    });

    expect(f).toEqual(false);

  });


});