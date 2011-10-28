/*
  @name:        /app/ui/components/image/proto

  @description: prototype for an image component
                
  @author:      Simon Jefford
  
*/
var object      = require("object"),
    components  = require("/app/ui/components/proto"),
    $           = require("/lib/dom").$;

exports.proto = object.create(components.proto, {
  
  //  properties
  html: '<img class="components image" data-region="default"></img>'

  //  public

  //  private

});