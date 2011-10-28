/*
  @name:        ui/layouts/section/proto

  @description: prototype for a section layout
                
  @author:      Simon Jefford
  
*/
var object  = require("object"),
    layouts = require("/app/ui/layouts/proto"),
    $       = require("/lib/dom").$;

exports.proto = object.create(layouts.proto, {
  
  //  properties
  html: '<div class="layouts section" data-region="default"></div>',

  //  public

  //  private

  //  handlers
  "__state.control.change__": function(e) {
    
    //  do some shit here

  }

});