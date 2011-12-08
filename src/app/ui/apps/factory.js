/*
  @name:         app/ui/apps/factory

  @description:  a factory that creates UI apps

  @author:       Simon Jefford
  
*/
"use strict";

var object  = require("object"),
    apps    = {
      "footer" : require("/app/ui/apps/footer/footer"),
      "header" : require("/app/ui/apps/header/header"),
      "list"   : require("/app/ui/apps/list/list"),
      "nav"    : require("/app/ui/apps/nav/nav"),
      "record" : require("/app/ui/apps/record/record")

    };


/*
  @description  creates an app 
  @param        {object} data
*/
exports.create = function(data) {
  
  var app = apps[data.object];

  if(typeof app === "undefined") {
    throw new TypeError(module.path + " cannot create object: " + data.object);
  }
  return object.create(app).init(data);

};