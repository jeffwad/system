/*
  @name:        /app/ui/components/link/proto

  @description: prototype for an link components
                
  @author:      Simon Jefford
  
*/
var object      = require("object"),
    components  = require("/app/ui/components/proto"),
    $           = require("/lib/dom").$;

exports.proto = object.create(components.proto, {
  
  //  properties
  html: '<a class="components link" data-region="default"></a>'

  //  public

  //  private

});