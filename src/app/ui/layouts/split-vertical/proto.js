/*
  @name:        ui/layouts/split-vertical/proto

  @description: prototype for a vetical splitter layout
                
  @author:      Simon Jefford
  
*/
var object  = require("object"),
    layouts = require("/app/ui/layouts/proto"),
    $       = require("/lib/dom").$;

exports.proto = object.create(layouts.proto, {
  
  //  properties
  html: '<div class="layouts split-vertical" data-region="default"></div>'

  //  public

  //  private

});