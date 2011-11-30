/*
  @name:        /app/sequences/bind/record

  @description: requests a data record for one off binding to an app

  @author:      Simon Jefford
 */
"use strict";

var object    = require("object"),
    sys       = require("sys"),
    forEach   = require("iter").forEach,
    sequence  = require("/app/sequences/proto").proto,
    seq,
    requests = {};
    
require("/app/commands/record/get");


seq = object.create(sequence).init(

  ["record/get", "execute", {
      CMD_OK    :    ["event", "/bind/data-record"],
      CMD_CANCELLED: ["event", "/bind/data-record/loading"],
      CMD_ERROR :    ["event", "/system/error"]
    }
  ]
);

sys.on("/bind/data-record/requested", function(e) {
  
  if(typeof requests[e.data.uuid] === "undefined") {

    requests[e.data.uuid] = e;
   
  }

});

sys.once("/system/ui/initialised", function() {

  forEach(requests, function(e) {

    seq.process(e);    

  });

});
