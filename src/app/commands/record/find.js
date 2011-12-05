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
      
      var that = this;

      return record.find(data.uuid).then(function(list) {
          
        return {
          status: that.CMD_OK,
          data: {
            uuid : data.uuid,
            list : list
          }
        };
      });

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