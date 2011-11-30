/*
  @name:        /app/ui/components/image/image

  @description: prototype for an image component
                
  @author:      Simon Jefford
  
*/
"use strict";
var object      = require("object"),
    component   = require("/app/ui/components/proto").proto,
    $           = require("/lib/dom").$;

exports.proto = object.create(component, {
  
  //  properties
  html: '<img class="components image" data-region="default"></img>',

  //  public
  update: function(src) {
    
    this.rootNode.setAttribute("src", src);
      
  }

  //  private

});