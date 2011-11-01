/*
  @name:         ui/proto tests

  @description:  specs for the ui proto module

  @author:       Simon Jefford
  
*/
var object        = require("object"),
    ui            = require("/app/ui/proto"),
    sectionProto  = require("/app/ui/layouts/section/proto");

describe("/ui/layouts/section/proto", function() {

  var section, child;

  child = object.create(ui.proto, {
    html: "<div></div>"
  });

  beforeEach(function() {

    section = object.create(sectionProto.proto).init({
      uuid: "01234"
    });

    section.registerChild(object.create(child).init({
      uuid: "ui-01234-01",
      event: "section-one"
    }));

    section.registerChild(object.create(child).init({
      uuid: "ui-01234-02",
      event: "section-two"
    }));

    section.registerChild(object.create(child).init({
      uuid: "ui-01234-03",
      event: "section-three"
    }));

    section.render();

  });

  afterEach(function() {

    section = null;

  });


  it("ui/layouts/section/proto#init should return an object with sectionProto on it's prototype", function() {
    
    expect(sectionProto.proto.isPrototypeOf(section)).toEqual(true);

  });

  it("ui/layouts/section/proto#_getSelectedChild should select the first child only", function() {

    var spy = sinon.spy(section, "_getSelectedChild");

    section.fire("state.control.change", {
      event: "section-one"
    });

    expect(spy.returned(section.children[0])).toEqual(true);

  });


  it("ui/layouts/section/proto#_getSelectedChild should select the second child only", function() {

    var spy = sinon.spy(section, "_getSelectedChild");

    section.fire("state.control.change", {
      event: "section-two"
    });

    expect(spy.returned(section.children[1])).toEqual(true);

  });


  it("ui/layouts/section/proto#_getSelectedChild should select the third child only", function() {

    var spy = sinon.spy(section, "_getSelectedChild");

    section.fire("state.control.change", {
      event: "section-three"
    });

    expect(spy.returned(section.children[2])).toEqual(true);

  });


  it("ui/layouts/section/proto should display the first child only", function() {

    section.fire("state.control.change", {
      event: "section-one"
    });

    expect(section._currentChild).toEqual(section.children[0]);
    expect(section.children[0].rootNode.style.display).toEqual("block");
    expect(section.children[1].rootNode.style.display).toEqual("none");
    expect(section.children[2].rootNode.style.display).toEqual("none");
  });


  it("ui/layouts/section/proto should display the second child only", function() {
    
    section.fire("state.control.change", {
      event: "section-two"
    });

    expect(section._currentChild).toEqual(section.children[1]);
    expect(section.children[0].rootNode.style.display).toEqual("none");
    expect(section.children[1].rootNode.style.display).toEqual("block");
    expect(section.children[2].rootNode.style.display).toEqual("none");
  });


  it("ui/layouts/section/proto should display the third child only", function() {
    
    section.fire("state.control.change", {
      event: "section-three"
    });

    expect(section._currentChild).toEqual(section.children[2]);
    expect(section.children[0].rootNode.style.display).toEqual("none");
    expect(section.children[1].rootNode.style.display).toEqual("none");
    expect(section.children[2].rootNode.style.display).toEqual("block");
  });


});