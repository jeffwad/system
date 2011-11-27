/*
  @name:         ui/proto tests

  @description:  specs for the ui proto module

  @author:       Simon Jefford
  
*/
"use strict";
var object        = require("object"),
    ui            = require("/app/ui/proto").proto,
    stackProto    = require("/app/ui/layouts/stack/stack").proto;

describe("/ui/layouts/stack/proto", function() {

  var stack, child;

  child = object.create(ui, {
    html: "<div></div>"
  });

  beforeEach(function() {

    stack = object.create(stackProto).init({
      uuid: "01234"
    });

    stack.registerChild(object.create(child).init({
      uuid      : "ui-01234-01",
      subscribe : "stack-one"
    }));

    stack.registerChild(object.create(child).init({
      uuid      : "ui-01234-02",
      subscribe : "stack-two"
    }));

    stack.registerChild(object.create(child).init({
      uuid      : "ui-01234-03",
      subscribe : "stack-three"
    }));

    stack.render();

  });

  afterEach(function() {

    stack = null;

  });


  it("ui/layouts/stack/proto#init should return an object with stackProto on it's prototype", function() {
    
    expect(stackProto.isPrototypeOf(stack)).toEqual(true);

  });

  it("ui/layouts/stack/proto#_getSelectedChild should select the first child only", function() {

    var spy = sinon.spy(stack, "_getSelectedChild");

    stack.fire("/state/control/change", {
      publish: "stack-one"
    });

    expect(spy.returned(stack.children[0])).toEqual(true);

  });


  it("ui/layouts/stack/proto#_getSelectedChild should select the second child only", function() {

    var spy = sinon.spy(stack, "_getSelectedChild");

    stack.fire("/state/control/change", {
      publish: "stack-two"
    });

    expect(spy.returned(stack.children[1])).toEqual(true);

  });


  it("ui/layouts/stack/proto#_getSelectedChild should select the third child only", function() {

    var spy = sinon.spy(stack, "_getSelectedChild");

    stack.fire("/state/control/change", {
      publish: "stack-three"
    });

    expect(spy.returned(stack.children[2])).toEqual(true);

  });


  it("ui/layouts/stack/proto#_selectChild should display the first child only", function() {

    stack._selectChild(stack.children[0]);
    expect(stack.children[0].rootNode.style.display).toEqual("block");
    expect(stack.children[1].rootNode.style.display).toEqual("none");
    expect(stack.children[2].rootNode.style.display).toEqual("none");
  });

  it("ui/layouts/stack/proto#_selectChild should display the second child only", function() {

    stack._selectChild(stack.children[1]);
    expect(stack.children[0].rootNode.style.display).toEqual("none");
    expect(stack.children[1].rootNode.style.display).toEqual("block");
    expect(stack.children[2].rootNode.style.display).toEqual("none");
  });

  it("ui/layouts/stack/proto#_selectChild should display the third child only", function() {

    stack._selectChild(stack.children[2]);
    expect(stack.children[0].rootNode.style.display).toEqual("none");
    expect(stack.children[1].rootNode.style.display).toEqual("none");
    expect(stack.children[2].rootNode.style.display).toEqual("block");
  });


  it("ui/layouts/stack/proto#__/state/control/change__ should set the currentChild to the first", function() {

    stack.fire("/state/control/change", {
      publish: "stack-one"
    });

    expect(stack._currentChild).toEqual(stack.children[0]);
  });


  it("ui/layouts/stack/proto#__/state/control/change__ should set the currentChild to the second", function() {
    
    stack.fire("/state/control/change", {
      publish: "stack-two"
    });

    expect(stack._currentChild).toEqual(stack.children[1]);
  });


  it("ui/layouts/stack/proto#__/state/control/change__ should set the currentChild to the third", function() {
    
    stack.fire("/state/control/change", {
      publish: "stack-three"
    });

    expect(stack._currentChild).toEqual(stack.children[2]);
  });


});