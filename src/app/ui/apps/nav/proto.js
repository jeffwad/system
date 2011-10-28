/*
  @name:        /app/ui/apps/nav/proto

  @description: prototype for a navigation app
                
  @author:      Simon Jefford
  
*/
var object  = require("object"),
    apps    = require("/app/ui/apps/proto"),
    $       = require("/lib/dom").$;

exports.proto = object.create(apps.proto, {
  
  //  properties
  html: '<nav class="apps nav" data-region="default"></nav>'

  //  public

  //  private

});