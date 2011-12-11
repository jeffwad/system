/*
  @name:        /app/commands/state/uri

  @description: creates a uri from the given state

  @author:      Simon Jefford
 */
"use strict";

//re quire("/app/commands/state/build");

var object    = require("object"),
    sys       = require("sys"),
    sequence  = require("/app/sequences/proto"),
    seq;


seq = object.create(sequence).init(

  ["state/build", "execute", {
      CMD_OK    : ["event", "/state/data/registered"],
      CMD_ERROR : ["event", "/system/error"]
    }
  ]
);

sys.on("/state/uri/requested", function(e) {
  
  //seq.process(e);
  e.data.state.uri = "/about/" + e.data.state.model.slug();
});