/*
  @name:         /app/models/repcrd

  @description:  record model

  @author:       Simon Jefford
  
*/
"use strict";

var object    = require("object"),
    net       = require("net"),
    forEach   = require("iter").forEach,
    component = require("/app/models/component").proto,
    loading,
    instances,
    uri;

loading = {};
instances = {};

uri = "/api/data-record";

exports.proto = {
  
  init: function(data) {

    var that = this;

    //  create the components
    this._createComponents(data.components);
    delete data.components;

    forEach(data, function(value, attr) {
      that[attr] = function() {return {value: function() {return value;}};};
    });

    instances[data.uuid] = this;

    return this;

  },

  _createComponents: function(components) {
    
    var that = this;

    forEach(components, function(componentData, attr) {
      
      that[attr] = function() {return object.create(component).init(componentData);};

    });

  }

};


exports.get = function(uuid) {
  
  if(instances[uuid]) {
    return instances[uuid];
  }

  if(typeof loading[uuid] !== "undefined") {
    return false;
  }

  loading[uuid] = uuid;

  return net.get(uri + "/uuid/" + uuid, "json").then(function(response) {
    return object.create(exports.proto).init(response.data);
  });
  
};

exports.find = function(data) {

};