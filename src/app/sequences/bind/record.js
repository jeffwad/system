/*
  @name:        /app/sequences/bind/record

  @description: requests a data record for one off binding to an app

  @author:      Simon Jefford
 */
"use strict";

var object              = require("object"),
    sequence            = require("/app/sequences/proto").proto,
    seq;
    
require("/app/commands/record/get");


seq = object.create(sequence).init(

  ["record/get", "execute", {
      CMD_OK    : ["event", "/bind/data-record"],
      CMD_ERROR : ["event", "/system/error"]
    }
  ]
);

seq.on("/bind/data-record/requested");