/*
  @name:         sys tests

  @description:  specs for the core sys module

  @author:       Simon Jefford
  
*/
var sys     = require("sys"),
    events  = require("events");

describe("sys", function() {

  it("sys#on should register an event listener", function() {

    var spy = sinon.spy(sys, "on");
    sys.on("test.event", function() {});

    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledTwice).toEqual(false);

    spy.reset();

  });

  it("sys#once should register an event listener", function() {
    
    var spy = sinon.spy(sys, "once");
    sys.once("test.event", function() {});

    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledTwice).toEqual(false);

    spy.reset();

  });


  it("sys#fire should call the on listeners repeatedly", function() {
    
    var spy1, spy2;
    spy1 = sinon.spy();
    spy2 = sinon.spy();
    
    sys.on("test.event.1", spy1);
    sys.on("test.event.2", spy2);

    sys.fire("test.event.1");
    sys.fire("test.event.1");

    sys.fire("test.event.2");
    sys.fire("test.event.2");
    sys.fire("test.event.2");

    expect(spy1.calledOnce).not.toEqual(true);
    expect(spy1.calledTwice).toEqual(true);

    expect(spy2.calledOnce).not.toEqual(true);
    expect(spy2.calledTwice).not.toEqual(true);
    expect(spy2.calledThrice).toEqual(true);

  });


  it("sys#fire should call the once listeners once", function() {
    
    var spy1, spy2;
    spy1 = sinon.spy();
    spy2 = sinon.spy();
    
    sys.once("test.event.1", spy1);
    sys.once("test.event.2", spy2);

    sys.fire("test.event.1");
    sys.fire("test.event.1");

    sys.fire("test.event.2");
    sys.fire("test.event.2");
    sys.fire("test.event.2");

    expect(spy1.calledOnce).toEqual(true);
    expect(spy1.calledTwice).not.toEqual(true);

    expect(spy2.calledOnce).toEqual(true);
    expect(spy2.calledTwice).not.toEqual(true);
    expect(spy2.calledThrice).not.toEqual(true);

  });


  it("sys#fire should pass an event object to the listeners with the event type and data", function() {
    
    var spy;
    spy = sinon.spy();
    
    sys.on("test.event.1", spy);

    sys.fire("test.event.1", {
      value: "test.event.1"
    });

    expect(spy.args[0][0].type).toEqual("test.event.1");
    expect(spy.args[0][0].data.value).toEqual("test.event.1");

  });

  it("sys#fire should return an event object", function() {
    
    var e = sys.fire("test.event.1", {
      value: "test.event.1"
    });

    expect(e.type).toEqual("test.event.1");
    expect(e.data.value).toEqual("test.event.1");

  });


  it("event#stopPropogation stop the event propogating", function() {
    
    var spy1, spy2, l1, l2;

    l1 = function(e) {e.stopPropogation();};
    l2 = function(e) {};
    spy1 = sinon.spy(l1);
    spy2 = sinon.spy(l2);

    sys.on("test.event.1", spy1);
    sys.on("test.event.1", spy2);

    sys.fire("test.event.1");

    expect(spy1.calledOnce).toEqual(true);
    expect(spy2.calledOnce).not.toEqual(true);

  });

  it("event#stopPropogation not to cancel the default action", function() {
    
    var e, l1;

    l1 = function(e) {e.stopPropogation();};

    sys.on("test.event.1", l1);

    e = sys.fire("test.event.1");

    expect(e.defaultPrevented).toEqual(false);

  });

  it("event#preventDefault should stop the event propogating and cancel the default action", function() {
    
    var e, spy1, spy2, l1, l2;

    l1 = function(e) {e.preventDefault();};
    l2 = function(e) {};
    spy1 = sinon.spy(l1);
    spy2 = sinon.spy(l2);

    sys.on("test.event.10", spy1);
    sys.on("test.event.10", spy2);

    e = sys.fire("test.event.10");
    expect(spy1.calledOnce).toEqual(true);
    expect(spy2.calledOnce).not.toEqual(true);

    expect(e.propogationStopped).toEqual(true);
    expect(e.defaultPrevented).toEqual(true);

  });

});