/*
  @name:         /app/models/site

  @description:  site model, handles data for site, nav, footer etc

  @author:       Simon Jefford
  
*/
"use strict";

var sys     = require("sys"),
    net     = require("net"),
    promise = require("async").promise,
    instances,
    uri;

instances = [];

uri = "/api/data-record";

exports.get = function(uuid) {

  return net.get(uri + "/" + uuid, "json").then(function(data) {
    console.log(data);
  });
  
};

exports.find = function(data) {

};