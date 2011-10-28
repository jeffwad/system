/*
  @name:        /app/ui/apps/footer/proto

  @description: prototype for a footer app
                
  @author:      Simon Jefford
  
*/
var object  = require("object"),
    apps    = require("/app/ui/apps/proto"),
    $       = require("/lib/dom").$;

exports.proto = object.create(apps.proto, {
  
  //  properties
  html: '<ul class="apps footer" data-region="default"></ul>'

  //  public

  //  private

});