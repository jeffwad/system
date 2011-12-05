/*
  @name:        /app/commands/state/listUpdate

  @description: fires a uuid specific state list update event

  @author:      Simon Jefford
 */
"use strict";

var object  = require("object"),
    sys     = require("sys"),
    command = require("/app/commands/proto").proto;


exports.proto = object.create(command, {

  execute: function(data) {

    try {
      
      sys.fire("/state/data-list/" + data.uuid + "/updated", {
        state: {
          list: data.list
        }
      });

      return {
        status: this.CMD_OK,
        data: {}
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