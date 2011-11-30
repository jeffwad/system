/*
  @name:        /app/commands/state/process

  @description: site initialisation process

  @author:      Simon Jefford
 */
"use strict";

var object              = require("object"),
    sequence            = require("/app/sequences/proto").proto,
    seq;
    
require("/app/commands/state/changeRequest");


seq = object.create(sequence).init(

  ["state/changeRequest", "execute", {
      CMD_OK        : ["event", "/state/updated"],
      CMD_CANCELLED : ["event", "/state/change/cancelled"]
    }
  ]
);

seq.on("/state/change/requested");