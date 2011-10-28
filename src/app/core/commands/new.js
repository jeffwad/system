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
      api.data.current(model.new());
      return {
        status: this.CMD_OK,
        data: data
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