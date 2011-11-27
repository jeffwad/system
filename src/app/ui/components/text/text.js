/*
  @name:        /app/ui/components/text/text

  @description: prototype for a text component
                
  @author:      Simon Jefford
  
*/
"use strict";
var object      = require("object"),
    component   = require("/app/ui/components/proto").proto,
    $           = require("/lib/dom").$;

exports.proto = object.create(component, {
  
  //  properties
  html: '<p class="components text" data-region="default"></p>',

  //  public
  update: function(value) {
    
    this.rootNode.innerHTML = value;
      
  }


  //  private

});