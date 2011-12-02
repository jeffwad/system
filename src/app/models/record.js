/*
  @name:         /app/models/repcrd

  @description:  record model

  @author:       Simon Jefford
  
*/
"use strict";

var object    = require("object"),
    net       = require("net"),
    forEach   = require("iter").forEach,
    promise   = require("async").promise,
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
  
  var p;

  //  if we already have our instance, return it via a promise
  if(instances[uuid]) {
    p = object.create(promise).init();
    p.resolve(instances[uuid]);
    return p;
  }

  //  if it's loading - return the loading promise
  if(typeof loading[uuid] !== "undefined") {
    return loading[uuid];
  }

  //  other wise load it
  return (loading[uuid] = net.get(uri + "/uuid/" + uuid, "json").then(function(response) {
    delete loading[uuid];
    return (instances[uuid] = object.create(exports.proto).init(response.data));
  }));
  
};

exports.find = function(data) {

};