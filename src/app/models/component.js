/*
  @name:         /app/models/repcrd

  @description:  record model

  @author:       Simon Jefford
  
*/
"use strict";

var object    = require("object"),
    net       = require("net"),
    forEach   = require("iter").forEach,
    instances,
    uri;

instances = [];

uri = "/api/data-component";

exports.proto = {
  
  init: function(data) {

    var that = this;

    forEach(data, function(value, attr) {

      that[attr] = function() {return value;};

    });

    instances.push(this);

    return this;

  }

};



exports.get = function(uuid) {

  return net.get(uri + "/uuid/" + uuid, "json").then(function(response) {
    return object.create(exports.proto).init(response.data);
  });
  
};

exports.find = function(data) {

};