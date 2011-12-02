/*
  @name:        /app/commands/ui/build

  @description: build the user interface from the site tree

  @author:      Simon Jefford
 */
"use strict";

var object  = require("object"),
    sys     = require("sys"),
    promise = require("async").promise,
    command = require("/app/commands/proto").proto,
    site    = require("/app/site");


exports.proto = object.create(command, {

  execute: function(data) {

    try {
      
      var states = [],
          ui = site.build();

      ui.render(document.body);      

      //  forward any system state update events down the ui stack
      sys.on("/state/updated", function(e) {

        ui.fire("/state/updated", e.data);

      });

      // test state object
      states[0] = {
        
        model: {
          
          name        : function(){return {value: function() {return "Simon Jefford";}};},
          description : function(){return {value: function() {return "Bit of a plonker";}};},
          title       : function(){return {value: function() {return "Mr";}};}

        }

      };

      states[1] = {
        
        model: {
          
          name        : function(){return {value: function() {return "Sarah Hackney";}};},
          description : function(){return {value: function() {return "Super woman";}};},
          title       : function(){return {value: function() {return "Ms";}};}

        }

      };

      sys.on("test1", function() {
        ui.fire("/state/data-record/01234567890/updated", {
          state: states[0]
        });
      });

      sys.on("test2", function() {
        ui.fire("/state/data-record/01234567890/updated", {
          state: states[1]
        });
      });

      return {
        status: this.CMD_OK,
        data: {
          ui: ui
        }
      };
      
    }
    catch(e) {

      return {
        status: this.CMD_ERROR,
        data: {
          e: e
        }
      };      
    }
  }

});