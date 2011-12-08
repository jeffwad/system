/*
  @name:        /app/commands/ui/addEventListeners

  @description: sets up the UI event listeners

  @author:      Simon Jefford
 */
"use strict";

var object  = require("object"),
    sys     = require("sys"),
    promise = require("async").promise,
    command = require("/app/commands/proto");


module.exports = object.create(command, {

  execute: function(data) {

    try {
      
      var ui = data.ui;

      //  initialise the DOM event listeners
      ui.addEventListeners();

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