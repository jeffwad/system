/*
  @name:        /app/ui/components/list-item/list-item

  @description: prototype for a text component
                
  @author:      Simon Jefford
  
*/
"use strict";
var object      = require("object"),
    component   = require("/app/ui/components/proto"),
    $           = require("/lib/dom").$;

module.exports = object.create(component, {
  
  //  properties
  html: '<li data-region="default"></li>'

  //  public

  //  private

});