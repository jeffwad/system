/*
  @name:         object tests

  @description:  specs for the core object module

  @author:       Simon Jefford
  
*/

"use strict";

var object = require("object");

describe("sys", function() {

  it("object#create should instantiate an object", function() {

    var proto, ui, app, entity,
        spy = sinon.spy();
        
    proto = {
      init: function() {
        spy(); 
        return this;
      }
    };

    ui = object.create(proto, {
      init: function() {
        spy();
        proto.init.call(this);
        return this;
      }
    });

    app = object.create(ui, {
      init: function() {
        spy();
        ui.init.call(this);
        return this;
      }
    });

    entity = object.create(app, {
      init: function() {
        spy();
        app.init.call(this);
        return this;
      }
    }).init();

    expect(spy.callCount).toEqual(4);

  });


});