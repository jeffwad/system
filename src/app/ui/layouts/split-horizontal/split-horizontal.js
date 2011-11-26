/*
  @name:        ui/layouts/split-horizontal/split-horizontal

  @description: prototype for a horizontal splitter layout
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    layout  = require("/app/ui/layouts/proto").proto,
    $       = require("/lib/dom").$;

exports.proto = object.create(layout, {
  
  //  properties
  html: '<div class="layouts split-horizontal" data-region="default"></div>'

  //  public

  //  private

});