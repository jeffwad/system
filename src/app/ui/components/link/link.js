/*
  @name:        /app/ui/components/link/link

  @description: prototype for an link components
                
  @author:      Simon Jefford
  
*/
"use strict";
var object      = require("object"),
    component   = require("/app/ui/components/proto").proto,
    $           = require("/lib/dom").$;

exports.proto = object.create(component, {
  
  //  properties
  html: '<a class="components link" data-region="default"></a>'

  //  public

  //  private

});