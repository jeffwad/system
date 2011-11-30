/*
  @name:        /app/commands/model/get

  @description: retrieve a Model instance of a given type
                if no id is provided default to false

  @author:      Simon Jefford
 */
"use strict";

var object  = require("object"),
    sys     = require("sys"),
    command = require("/app/commands/proto").proto;


exports.proto = object.create(command, {

  execute: function(data) {

    try {
      
      var p, model;

      model = sys.loadModel(data.model);

      return model.get(data.uuid).then(function(instance) {
        
        return {
          
          status: this.CMD_OK,
          data: {
            instance: instance
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