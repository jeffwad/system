/*
  @name:         /app/models/proto

  @description:  record prototype

  @author:       Simon Jefford
  
*/
"use strict";

var object    = require("object"),
    net       = require("net"),
    promise   = require("async").promise,
    forEach   = require("iter").forEach;

exports.proto = {
  
  init: function(data) {

    this.apis     = data.apis;
    this.instance = data.instance;

    this._loading   = {};
    this._instances = {};
    this._views     = {};

    return this;

  },


  create: function(data) {
    
    var instance = object.create(this.instance).init(data);
    this._instances[data.uuid] = instance;
    return instance;

  },


  find: function(uuid) {

    var p, that = this;

    //  if we already have our instance, return it via a promise
    if(this._views[uuid]) {
      p = object.create(promise).init();
      p.resolve(this._views[uuid]);
      return p;
    }

    //  if it's loading - return the loading promise
    if(typeof this._loading[uuid] !== "undefined") {
      return this._loading[uuid];
    }

    //  other wise load it
    return (this._loading[uuid] = net.get(this.apis.find + "/uuid/" + uuid, "json").then(function(response) {
      delete that._loading[uuid];
      that._views[uuid] = [];
      forEach(response.data, function(data) {

        that._views[uuid].push((that._instances[data.uuid] = that.create(data)));
      
      });
      return that._views[uuid];
    }));

    
  },


  get: function(uuid) {
    
    var p, that = this;

    //  if we already have our instance, return it via a promise
    if(this._instances[uuid]) {
      p = object.create(promise).init();
      p.resolve(this._instances[uuid]);
      return p;
    }

    //  if it's loading - return the loading promise
    if(typeof this._loading[uuid] !== "undefined") {
      return this._loading[uuid];
    }

    //  other wise load it
    return (this._loading[uuid] = net.get(this.apis.get + "/uuid/" + uuid, "json").then(function(response) {
      delete that._loading[uuid];
      return (that._instances[uuid] = that.create(response.data));
    }));
    
  }

};
