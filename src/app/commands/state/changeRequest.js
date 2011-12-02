/*
  @name:        /app/commands/state/changeRequest

  @description: handler for a change request

  @author:      Simon Jefford
 */
"use strict";

var object  = require("object"),
    sys     = require("sys"),
    promise = require("async").promise,
    command = require("/app/commands/proto").proto;


exports.proto = object.create(command, {

  execute: function(data) {

    var status, e;

    e = sys.fire("/state/update/requested");
    status = e.defaultPrevented ? this.CMD_CANCELLED : this.CMD_OK;

    return {
      status: status,
      data: data
    };

  }

});