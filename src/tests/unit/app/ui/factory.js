/*
  @name:         ui/proto/factory tests

  @description:  specs for the ui proto factory module

  @author:       Simon Jefford<si@ibrokethat.com>
  
*/
var object      = require("object"),
    events      = require("events"),
    factory     = require("/app/ui/factory"),
    layouts     = require("/app/ui/layouts/factory"),
    apps        = require("/app/ui/apps/factory"),
    components  = require("/app/ui/components/factory");


describe("/ui/proto/factory", function() {

  var spyL, spyA, spyC;

  beforeEach(function() {

    spyL = sinon.stub(layouts, "create", function() {
      return {type: "layout-entity"};
    });

    spyA = sinon.stub(apps, "create", function() {
      return {type: "app-entity"};
    });

    spyC = sinon.stub(components, "create", function() {
      return {type: "component-entity"};
    });

  });

  afterEach(function() {

    layouts.create.restore();
    apps.create.restore();
    components.create.restore();

  });


  it("ui/proto/factory#create should return an object from the layout factory", function() {
    
    var l = factory.create({type: "layouts"});  

    expect(spyL.calledOnce).toEqual(true);
    expect(l.type).toEqual("layout-entity");
  });

  it("ui/proto/factory#create should return an object from the app factory", function() {
    
    var l = factory.create({type: "apps"});  

    expect(spyA.calledOnce).toEqual(true);
    expect(l.type).toEqual("app-entity");
  });

  it("ui/proto/factory#create should return an object from the component factory", function() {
    
    var l = factory.create({type: "components"});  

    expect(spyC.calledOnce).toEqual(true);
    expect(l.type).toEqual("component-entity");
  });

  it("ui/proto/factory#getChildren should return the value of the children key", function() {
    
    var c = factory.getChildren({children: "child-entities"});  

    expect(c).toEqual("child-entities");

  });

  it("ui/proto/factory#getChildren should return false", function() {
    
    var c = factory.getChildren({noChildren: "child-entities"});  

    expect(c).toEqual(false);

  });


  it("ui/proto/factory#addChild call parent.registerChild with the child as parameter", function() {
    
    var child, parent, spy;

    child = {type: "child"};
    parent = {
      registerChild: function() {}
    };

    spy = sinon.spy(parent, "registerChild");

    factory.addChild(parent, child);

    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith(child)).toEqual(true);

  });


});