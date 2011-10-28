/*
  @name:        ui/layouts/split-horizontal/proto

  @description: prototype for a horizontal splitter layout
                
  @author:      Simon Jefford
  
*/
var object  = require("object"),
    layouts = require("/app/ui/layouts/proto"),
    $       = require("/lib/dom").$;

exports.proto = object.create(layouts.proto, {
  
  //  properties
  html: '<div class="layouts split-horizontal" data-region="default"></div>'

  //  public

  //  private

});