/*
	@name: 			  sequence

	@description:	core sequence

	@author:		  Simon Jefford
 */
var sys   = require("sys"),
    some    = require("iter").some,
    forEach = require("iter").forEach,
    command = require("/lib/core/command"),
    promise = require("async").promise;


cmd = object.create(command, {

	execute: function(data) {
    
    try {
      var model = api.data.load(data.model);
      return {
        status: this.CMD_OK,
        data: {
          raw: data.raw,
          instance: model.new()
        }
      }
    }
    catch(e) {
      return {
        status: this.CMD_ERROR,
        data: new Error("");
      }
    }


  }


};

object.mixin(exports, cmd);