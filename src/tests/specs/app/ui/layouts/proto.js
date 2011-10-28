/*
  @name:         ui/layouts/proto tests

  @description:  specs for the ui layouts proto module

  @author:       Simon Jefford
  
*/
var object  = require("object"),
    ui      = require("/app/ui/proto"),
    layouts = require("/app/ui/layouts/proto");

describe("/ui/layouts/proto/", function() {

  var entity;

  beforeEach(function() {

    entity = object.create(layouts.proto).init("01234");

  });

  afterEach(function() {

    entity = null;

  });


  it("ui/layouts/proto#init should return an object with ui/proto on it's prototype", function() {
    
    expect(ui.proto.isPrototypeOf(entity)).toEqual(true);

  });


  it("ui/layouts/proto#init should set up it's initial properties", function() {
    
    expect(entity.hasOwnProperty("_listeners")).toEqual(true);
    expect(entity._listeners).toEqual({
      on:{},
      once:{}
    });

    expect(entity.uuid).toEqual("01234");
    expect(entity.children).toEqual([]);

  });


  it("ui/layouts/proto#_render should render child objects one after another", function() {

    var child1, child2, child3;

    entity.html = "<div></div>";
    child1._render(entity.rootNode);

    expect(spy.threw("ReferenceError")).toEqual(true);

  });

  it("ui/layouts/proto#_render should render some mark up to the specified region", function() {

    var root = document.createElement("div");

    root.innerHTML = "<div data-region=\"test\"></div>";
    entity.html = "<div>test _render()</div>";
    entity.region = "test";
    entity.render(root);
    expect(entity.rootNode.innerHTML).toEqual("<div>test _render()</div>");

  });


});