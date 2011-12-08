/*
  @name:        /app/commands/ui/build

  @description: build the user interface from the site tree

  @author:      Simon Jefford
 */
"use strict";

var object  = require("object"),
    sys     = require("sys"),
    command = require("/app/commands/proto"),
    site    = require("/app/site");


module.exports = object.create(command, {

  execute: function(data) {

    try {
      
      var ui = site.build();

      ui.render(document.body);      

      //  forward any system state update events down the ui stack
      sys.on("/state/updated", function(e) {

        ui.fire("/state/updated", e.data);

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