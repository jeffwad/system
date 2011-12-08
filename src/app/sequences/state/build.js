/*
  @name:        /app/commands/state/build

  @description: registers state information while the site is loading

  @author:      Simon Jefford
 */
"use strict";

var object    = require("object"),
    sys       = require("sys"),
    sequence  = require("/app/sequences/proto"),
    seq;
    
require("/app/commands/state/build");


seq = object.create(sequence).init(

  ["state/build", "execute", {
      CMD_OK    : ["event", "/state/data/registered"],
      CMD_ERROR : ["event", "/system/error"]
    }
  ]
);

sys.on("/state/data/build", function(e) {
  
  seq.process(e);

});