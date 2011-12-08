/*
  @name:         app/ui/components/factory

  @description:  a factory that creates UI components

  @author:       Simon Jefford
  
*/
"use strict";
var object     = require("object"),
    components = {
      "image"     : require("/app/ui/components/image/image"),
      "link"      : require("/app/ui/components/link/link"),
      "list-item" : require("/app/ui/components/list-item/list-item"),
      "text"      : require("/app/ui/components/text/text")
    };



/*
  @description  creates a component
  @param        {object} data
*/
exports.create = function(data) {

  var component = components[data.object];

  if(typeof component === "undefined") {
    throw new TypeError(module.path + " cannot create object: " + data.object);
  }
  return object.create(component).init(data);  

};