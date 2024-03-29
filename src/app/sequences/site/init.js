/*
  @name:        /app/commands/site/init

  @description: site initialisation process

  @author:      Simon Jefford
 */
"use strict";

var object    = require("object"),
    sys       = require("sys"),
    sequence  = require("/app/sequences/proto").proto,
    seq;
    
require("/app/commands/ui/build");
require("/app/commands/ui/addEventListeners");


seq = object.create(sequence).init(

  ["ui/build", "execute", {
          
      CMD_ERROR : ["event", "/system/error"],
      CMD_OK    : ["ui/addEventListeners", "execute", {

          CMD_ERROR : ["event", "/system/error"],
          CMD_OK    : ["event", "/system/ui/initialised"]

        }
      ]

    }
  ]

);

sys.once("/system/app/loaded", function(e) {
  
  seq.process(e);

});
