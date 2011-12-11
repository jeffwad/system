/*
  @name:        /app/sequences/bind/record

  @description: requests a data record for one off binding to an app

  @author:      Simon Jefford
 */
"use strict";

require("/app/commands/record/get");
require("/app/commands/bind/record");

var object    = require("object"),
    sys       = require("sys"),
    forEach   = require("iter").forEach,
    sequence  = require("/app/sequences/proto"),
    seq,
    requests = {};


seq = object.create(sequence).init(

  ["record/get", "execute", {
      CMD_OK    : ["bind/record", "execute", {
          CMD_OK    : ["event", "/bind/data-record/success"],
          CMD_ERROR : ["event", "/system/error"]
        }
      ],
      CMD_ERROR : ["event", "/system/error"]
    }
  ]
);

//  we don't want to request the same set of data twice
sys.on("/bind/data-record/requested", function(e) {
  
  requests[e.data.uuid] = e;

});

//  process all the bindings after the ui is built
sys.once("/system/ui/initialised", function() {

  forEach(requests, function(e) {

    seq.process(e);    

  });

});
