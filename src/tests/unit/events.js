/*
  @name:         events tests

  @description:  specs for the core events module

  @author:       Simon Jefford
  
*/
"use strict";

var object = require("object"),
    events = require("events");

describe("events", function() {

  var ev;

  beforeEach(function() {

    ev = object.create(events.proto).init();

  });

  afterEach(function() {

    ev = null;

  });

  it("events#init should return an object with events on it's prototype", function() {
    
    expect(events.proto.isPrototypeOf(ev)).toEqual(true);

  });


  it("events#init should initialise the event listener containers", function() {
    
    expect(ev._listeners).toEqual({
      on:{},
      once:{}
    });

  });

  it("events#on should register an event listener", function() {
    
    var spy = sinon.spy(ev, "on");
    ev.on("test.event", function() {});

    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledTwice).toEqual(false);

  });

  it("events#once should register an event listener", function() {
    
    var spy = sinon.spy(ev, "once");
    ev.once("test.event", function() {});

    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledTwice).toEqual(false);

  });

  it("events#on should register listeners for different events", function() {
    
    ev.on("test.event.1", function() {});
    ev.on("test.event.2", function() {});

    expect(ev._listeners.on["test.event.1"].length).toEqual(1);
    expect(ev._listeners.on["test.event.2"].length).toEqual(1);

  });

  it("events#once should register listeners for different events", function() {
    
    ev.once("test.event.1", function() {});
    ev.once("test.event.2", function() {});

    expect(ev._listeners.once["test.event.1"].length).toEqual(1);
    expect(ev._listeners.once["test.event.2"].length).toEqual(1);

  });



  it("events#on should return an event handler object", function() {
    
    var e = ev.on("test.event.1", function() {});

    expect(typeof e.start === "function").toEqual(true);
    expect(typeof e.stop === "function").toEqual(true);

  });


  it("events#once should return an event handler object", function() {
    
    var e = ev.once("test.event.1", function() {});

    expect(typeof e.start === "function").toEqual(true);
    expect(typeof e.stop === "function").toEqual(true);

  });


  it("eventhandler#stop stops an event listener listening", function() {
    
    var spy, e;

    spy = sinon.spy();
    e = ev.on("test.event.1", spy);

    ev.fire("test.event.1");

    e.stop();

    ev.fire("test.event.1");
    ev.fire("test.event.1");

    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledTwice).not.toEqual(true);
    expect(spy.calledThrice).not.toEqual(true);

  });

  it("eventhandler#start starts an event listener listening", function() {
    
    var spy, e;

    spy = sinon.spy();
    e = ev.on("test.event.1", spy);

    ev.fire("test.event.1");

    e.stop();

    ev.fire("test.event.1");
    ev.fire("test.event.1");
    ev.fire("test.event.1");

    e.start();

    ev.fire("test.event.1");

    expect(spy.calledOnce).not.toEqual(true);
    expect(spy.calledTwice).toEqual(true);
    expect(spy.calledThrice).not.toEqual(true);

  });


  it("events#fire should call the on listeners repeatedly", function() {
    
    var spy1, spy2;
    spy1 = sinon.spy();
    spy2 = sinon.spy();
    
    ev.on("test.event.1", spy1);
    ev.on("test.event.2", spy2);

    ev.fire("test.event.1");
    ev.fire("test.event.1");

    ev.fire("test.event.2");
    ev.fire("test.event.2");
    ev.fire("test.event.2");

    expect(spy1.calledOnce).not.toEqual(true);
    expect(spy1.calledTwice).toEqual(true);

    expect(spy2.calledOnce).not.toEqual(true);
    expect(spy2.calledTwice).not.toEqual(true);
    expect(spy2.calledThrice).toEqual(true);

  });


  it("events#fire should call the once listeners once", function() {
    
    var spy1, spy2;
    spy1 = sinon.spy();
    spy2 = sinon.spy();
    
    ev.once("test.event.1", spy1);
    ev.once("test.event.2", spy2);

    ev.fire("test.event.1");
    ev.fire("test.event.1");

    ev.fire("test.event.2");
    ev.fire("test.event.2");
    ev.fire("test.event.2");

    expect(spy1.calledOnce).toEqual(true);
    expect(spy1.calledTwice).not.toEqual(true);

    expect(spy2.calledOnce).toEqual(true);
    expect(spy2.calledTwice).not.toEqual(true);
    expect(spy2.calledThrice).not.toEqual(true);

  });


  it("events#fire should pass an event object to the listeners with the event type and data", function() {
    
    var spy;
    spy = sinon.spy();
    
    ev.on("test.event.1", spy);

    ev.fire("test.event.1", {
      value: "test.event.1"
    });

    expect(spy.args[0][0].type).toEqual("test.event.1");
    expect(spy.args[0][0].data.value).toEqual("test.event.1");

  });

  it("events#fire should return an event object", function() {
    
    var e = ev.fire("test.event.1", {
      value: "test.event.1"
    });

    expect(e.type).toEqual("test.event.1");
    expect(e.data.value).toEqual("test.event.1");

  });


  it("event#stopPropogation stops the event propogating", function() {
    
    var spy1, spy2, l1, l2;

    l1 = function(e) {e.stopPropogation();};
    l2 = function(e) {};
    spy1 = sinon.spy(l1);
    spy2 = sinon.spy(l2);

    ev.on("test.event.1", spy1);
    ev.on("test.event.1", spy2);

    ev.fire("test.event.1");

    expect(spy1.calledOnce).toEqual(true);
    expect(spy2.calledOnce).not.toEqual(true);

  });

  it("event#stopPropogation not to cancel the default action", function() {
    
    var e, l1;

    l1 = function(e) {e.stopPropogation();};

    ev.on("test.event.1", l1);

    e = ev.fire("test.event.1");

    expect(e.defaultPrevented).toEqual(false);

  });

  it("event#preventDefault should stop the event propogating and cancel the default action", function() {
    
    var e, spy1, spy2, l1, l2;

    l1 = function(e) {e.preventDefault();};
    l2 = function(e) {};
    spy1 = sinon.spy(l1);
    spy2 = sinon.spy(l2);

    ev.on("test.event.1", spy1);
    ev.on("test.event.1", spy2);

    e = ev.fire("test.event.1");

    expect(spy1.calledOnce).toEqual(true);
    expect(spy2.calledOnce).not.toEqual(true);

    expect(e.propogationStopped).toEqual(true);
    expect(e.defaultPrevented).toEqual(true);

  });


  it("event#_autoBindListeners should automatically bind listeners", function() {
    
    var ev, spy1, spy2;

    ev = object.create(events.proto, {
      
      "/test/auto/1": function(e) {
        
      },

      "/test/auto/2": function(e) {
        
      }

    }).init();

    spy1 = sinon.spy(ev, "/test/auto/1");
    spy2 = sinon.spy(ev, "/test/auto/2");

    ev.fire("/test/auto/1");
    ev.fire("/test/auto/2");

    expect(spy1.calledOnce).toEqual(true);
    expect(spy2.calledOnce).toEqual(true);

  });



});