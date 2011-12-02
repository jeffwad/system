/*
  @name:        /app/commands/bind/record

  @description: fires a uuid specific bind record event

  @author:      Simon Jefford
 */
"use strict";

var object  = require("object"),
    sys     = require("sys"),
    command = require("/app/commands/proto").proto;


exports.proto = object.create(command, {

  execute: function(data) {

    try {
      
      sys.fire("/bind/data-record/" + data.uuid, {
        state: {
          model: data.instance
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