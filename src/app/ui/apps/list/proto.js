/*
  @name:        /app/ui/apps/list/proto

  @description: prototype for a list app
                
  @author:      Simon Jefford
  
*/
var object  = require("object"),
    apps    = require("/app/ui/apps/proto"),
    $       = require("/lib/dom").$;

exports.proto = object.create(apps.proto, {
  
  //  properties
  html: '<ul class="apps list" data-region="default"></ul>'

  //  public

  //  private

});