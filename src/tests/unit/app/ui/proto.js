/*
  @name:         ui/proto tests

  @description:  specs for the ui proto module

  @author:       Simon Jefford
  
*/
var object = require("object"),
    events = require("events"),
    ui     = require("/app/ui/proto");

describe("/ui/proto", function() {

  var entity;

  beforeEach(function() {

    entity = object.create(ui.proto).init({
      uuid: "01234"
    });

  });

  afterEach(function() {

    entity = null;

  });


  it("ui/proto#init should return an object with events on it's prototype", function() {
    
    expect(events.proto.isPrototypeOf(entity)).toEqual(true);

  });


  it("ui/proto#init should set up it's initial properties", function() {
    
    expect(entity.hasOwnProperty("_listeners")).toEqual(true);
    expect(entity._listeners).toEqual({
      on:{},
      once:{}
    });

    expect(entity.uuid).toEqual("01234");
    expect(entity.children).toEqual([]);

  });


  it("ui/proto#render should throw an error if the object has no html property", function() {

    var spy = sinon.spy(entity, "render");    
    try{
      entity.render();
    }
    catch(e) {}
    expect(spy.threw()).toEqual(true);

  });


  it("ui/proto#render should append it's rootNode to a domNode if passed passed a domNode", function() {

    var domNode = document.createElement("div");
    entity.html = "<div class=\"test-root\"></div>";    
    entity.render(domNode);
    
    expect(domNode.innerHTML).toEqual("<div class=\"test-root\"></div>");

  });


  it("ui/proto#_render should convert it's html property to it's rootNode", function() {

    entity.html = "<div class=\"test-root\"></div>";
    entity.render();
    
    expect(entity.rootNode.className).toEqual("test-root");

  });


  it("ui/proto#_renderChildren should render a child to the default region", function() {

    var child;

    child = object.create(ui.proto, {
      html: "<div class=\"child\"></div>"
    }).init("child");

    entity.registerChild(child);

    entity.html = "<div data-region=\"default\"></div>";
    entity._render();
    entity._renderChildren();
    expect(entity.rootNode.innerHTML).toEqual("<div class=\"child\"></div>");

  });


  it("ui/proto#_renderChildren should render a child to a specified region", function() {

    var child;

    child = object.create(ui.proto, {
      html: "<div class=\"child\"></div>"
    }).init({
      uuid: "child",
      region: "test"
    });

    entity.registerChild(child);

    entity.html = "<div data-region=\"test\"></div>";
    entity._render();
    entity._renderChildren();
    expect(entity.rootNode.innerHTML).toEqual("<div class=\"child\"></div>");

  });


  it("ui/proto#_renderChildren should render multiple children", function() {

    var child;

    child = object.create(ui.proto, {
      html: "<div class=\"child\"></div>"
    }).init("child");

    entity.registerChild(child);
    entity.registerChild(child);
    entity.registerChild(child);


    entity.html = "<div data-region=\"default\"></div>";
    entity._render();
    entity._renderChildren();
    expect(entity.rootNode.innerHTML).toEqual("<div class=\"child\"></div><div class=\"child\"></div><div class=\"child\"></div>");

  });

  it("ui/proto#_render should throw en error if the region cannot be found", function() {

    var child, spy;

    spy = sinon.spy(entity, "_renderChildren");

    child = object.create(ui.proto, {
      region: "cannot-be-found",
      html: "<div class=\"child\"</div>"
    }).init("child");

    entity.registerChild(child);

    entity.html = "<div data-region=\"test\"></div>";
    entity._render();
    try {
      entity._renderChildren();
    }
    catch(e) {
      expect(spy.threw()).toEqual(true);  
    }
    

  });


  it("ui/proto#registerChild should not register a child object of the wrong type", function() {

    var spy = sinon.spy(entity, "registerChild");
    try{
      entity.registerChild({});
    }
    catch(e) {}
    expect(spy.threw("TypeError")).toEqual(true);

  });

  it("ui/proto#registerChild should register a child object", function() {
    
    try{
      entity.registerChild(object.create(ui.proto).init("child1"));
    }
    catch(e) {}  
    expect(entity.children.length).toEqual(1);

  });


  it("ui/proto#registerParent should not register a parent object of the wrong type", function() {
    
    var spy = sinon.spy(entity, "registerParent");
    try{
      entity.registerParent({});
    }
    catch(e) {}
    expect(spy.threw("TypeError")).toEqual(true);

  });

  it("ui/proto#registerParent should register a parent object", function() {

    var p = object.create(ui.proto).init("parent");
    try{
      entity.registerParent(p);
    }
    catch(e) {}
    expect(entity.parent).toEqual(p);

  });


  it("ui/proto#fire should fire an event to this objects listeners with no phase", function() {
    
    var spy = sinon.spy();

    entity.on("test.event.1", spy);
    entity.fire("test.event.1");
    expect(spy.calledOnce).toEqual(true);
    expect(spy.args[0][0].type).toEqual("test.event.1");
    expect(spy.args[0][0].phase).toEqual(undefined);

  });


  it("ui/proto#fire should fire a capture event on this objects children", function() {
    
    var spy1, spy2, spy3;

    entity.registerChild(object.create(ui.proto).init("child1"));
    entity.registerChild(object.create(ui.proto).init("child2"));
    entity.registerChild(object.create(ui.proto).init("child3"));
    
    spy1 = sinon.spy(entity.children[0], "capture");
    spy2 = sinon.spy(entity.children[1], "capture");
    spy3 = sinon.spy(entity.children[2], "capture");

    entity.fire("test.event.1");
    expect(spy1.calledOnce).toEqual(true);
    expect(spy1.calledTwice).not.toEqual(true);
    expect(spy2.calledOnce).toEqual(true);
    expect(spy2.calledTwice).not.toEqual(true);
    expect(spy3.calledOnce).toEqual(true);
    expect(spy3.calledTwice).not.toEqual(true);

  });


  it("ui/proto#fire should fire a bubble event on this objects parent", function() {
    
    var spy;

    entity.registerParent(object.create(ui.proto).init("parent"));
    
    spy = sinon.spy(entity.parent, "bubble");

    entity.fire("test.event.1");
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledTwice).not.toEqual(true);

  });


  it("ui/proto#bubble should fire an event to this objects listeners with bubble phase", function() {
    
    var spy = sinon.spy();

    entity.on("test.event.1", spy);
    entity.bubble(object.create(events.event).init("test.event.1"));
    expect(spy.calledOnce).toEqual(true);
    expect(spy.args[0][0].type).toEqual("test.event.1");
    expect(spy.args[0][0].phase).toEqual("bubble");

  });

  it("ui/proto#capture should fire an event to this objects listeners with capture phase", function() {
    
    var spy = sinon.spy();

    entity.on("test.event.1", spy);
    entity.capture(object.create(events.event).init("test.event.1"));
    expect(spy.calledOnce).toEqual(true);
    expect(spy.args[0][0].type).toEqual("test.event.1");
    expect(spy.args[0][0].phase).toEqual("capture");

  });


  it("ui/proto#show set show the object", function() {
    
    entity.html = "<div data-region=\"default\"></div>";
    entity._render();
    entity.rootNode.style.display = "none";

    entity.show();
    expect(entity.rootNode.style.display).toEqual("block");

  });

  it("ui/proto#hide set hide the object", function() {
    
    entity.html = "<div data-region=\"default\"></div>";
    entity._render();

    entity.hide();
    expect(entity.rootNode.style.display).toEqual("none");

  });



});