/*
  @name:        /app/ui/components/text/proto

  @description: prototype for a text component
                
  @author:      Simon Jefford
  
*/
var object      = require("object"),
    components  = require("/app/ui/components/proto"),
    $           = require("/lib/dom").$;

exports.proto = object.create(components.proto, {
  
  //  properties
  html: '<p class="components text" data-region="default"></p>'

  //  public

  //  private

});