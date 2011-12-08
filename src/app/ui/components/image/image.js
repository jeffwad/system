/*
  @name:        /app/ui/components/image/image

  @description: prototype for an image component
                
  @author:      Simon Jefford
  
*/
"use strict";
var object      = require("object"),
    forEach     = require("iter").forEach,
    component   = require("/app/ui/components/proto"),
    $           = require("/lib/dom").$;

module.exports = object.create(component, {
  
  //  properties
  html: '<img class="components image" data-region="default"></img>',

  //  public
  update: function(data) {
    
    var that = this;

    forEach(data, function(value, key) {
      
      that.rootNode.setAttribute(key, value);
      
    });

  }

  //  private

});