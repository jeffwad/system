/*
  @name:        /app/ui/apps/entry/proto

  @description: prototype for an entry app
                
  @author:      Simon Jefford
  
*/
var object  = require("object"),
    apps    = require("/app/ui/apps/proto"),
    $       = require("/lib/dom").$;

exports.proto = object.create(apps.proto, {
  
  //  properties
  html: '<div class="apps entry" data-region="default"></div>'

  //  public

  //  private

});