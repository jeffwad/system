/*
  @name:        /app/commands/state/process

  @description: site initialisation process

  @author:      Simon Jefford
 */
"use strict";

var object    = require("object"),
    sys       = require("sys"),
    sequence  = require("/app/sequences/proto"),
    seq;
    
require("/app/commands/state/changeRequest");


seq = object.create(sequence).init(

  ["state/changeRequest", "execute", {
      CMD_OK        : ["event", "/state/updated"],
      CMD_CANCELLED : ["event", "/state/change/cancelled"]
    }
  ]
);

sys.on("/state/change/requested", function(e) {
  
  seq.process(e);

});