/*
  @name:        /app/commands/model/get

  @description: retrieve a Model instance of a given type
                if no id is provided default to false

  @author:      Simon Jefford
 */
"use strict";

var object  = require("object"),
    sys     = require("sys"),
    record  = require("/app/models/record"),
    command = require("/app/commands/proto").proto;


exports.proto = object.create(command, {

  execute: function(data) {

    try {
      
      var that = this, response;

      response = record.get(data.uuid);

      if(!response) {

        return {
          status: this.CMD_CANCELLED,
          data: {}
        };

      }
      else {

        return response.then(function(instance) {
          
          return {
            status: that.CMD_OK,
            data: {
              uuid     : data.uuid,
              instance : instance
            }
          };
        });
      }

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