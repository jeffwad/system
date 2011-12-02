/*
  @name:         ui/layouts/proto tests

  @description:  specs for the ui layouts proto module

  @author:       Simon Jefford
  
*/
"use strict";
var object      = require("object"),
    ui          = require("/app/ui/proto"),
    components  = require("/app/ui/components/proto");

describe("/ui/components/proto/", function() {

  var entity;

  beforeEach(function() {

    entity = object.create(components.proto).init({
      uuid: "01234"
    });

  });

  afterEach(function() {

    entity = null;

  });


  it("ui/layouts/proto#init should return an object with ui/proto on it's prototype", function() {
    
    expect(ui.proto.isPrototypeOf(entity)).toEqual(true);

  });


  it("ui/layouts/proto#init should set up it's initial properties", function() {
    
    expect(entity.hasOwnProperty("_listeners")).toEqual(true);

    expect(entity.uuid).toEqual("01234");
    expect(entity.children).toEqual([]);

  });


});