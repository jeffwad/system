/*
  @name:         app/ui/layouts/factory

  @description:  a factory that creates UI layouts

  @author:       Simon Jefford
  
*/
"use strict";

var object  = require("object"),
    layouts = {
      "split-horizontal"  : require("/app/ui/layouts/split-horizontal/split-horizontal"),
      "split-vertical"    : require("/app/ui/layouts/split-vertical/split-vertical"),
      "stack"             : require("/app/ui/layouts/stack/stack")
    };



/*
  @description  creates a layout
  @param        {object} data
*/
exports.create = function(data) {

  var layout = layouts[data.object].proto;

  if(typeof layout === "undefined") {
    throw new TypeError(module.path + " cannot create object: " + data.object);
  }
  return object.create(layout).init(data);  

};