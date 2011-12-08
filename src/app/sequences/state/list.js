/*
  @name:        /app/sequences/state/list

  @description: requests a data list

  @author:      Simon Jefford
 */
"use strict";

var object    = require("object"),
    sys       = require("sys"),
    forEach   = require("iter").forEach,
    sequence  = require("/app/sequences/proto"),
    seq,
    requests = {};
    
require("/app/commands/record/find");
require("/app/commands/state/listUpdate");


seq = object.create(sequence).init(

  ["record/find", "execute", {
      CMD_OK    : ["state/listUpdate", "execute", {
          CMD_OK    : ["event", "/state/data-list/success"],
          CMD_ERROR : ["event", "/system/error"]
        }
      ],
      CMD_ERROR : ["event", "/system/error"]
    }
  ]
);

//  we don't want to request the same set of data twice
sys.on("/state/data-list/requested", function(e) {
  
  requests[e.data.uuid] = e;

});

//  process all the bindings after the ui is built
sys.once("/system/ui/initialised", function() {

  forEach(requests, function(e) {

    seq.process(e);    

  });

});
