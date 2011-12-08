/*
  @name:        ui/layouts/split-vertical/split-vertical

  @description: prototype for a vetical splitter layout
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    layout  = require("/app/ui/layouts/proto"),
    $       = require("/lib/dom").$;

module.exports = object.create(layout, {
  
  //  properties
  html: '<div class="layouts split-vertical" data-region="default"></div>'

  //  public

  //  private

});