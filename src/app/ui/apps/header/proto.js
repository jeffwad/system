/*
  @name:        /app/ui/apps/header/proto

  @description: prototype for a header app
                
  @author:      Simon Jefford
  
*/
var object  = require("object"),
    apps    = require("/app/ui/apps/proto"),
    $       = require("/lib/dom").$;

exports.proto = object.create(apps.proto, {
  
  //  properties
  html: [
          '<header class="apps header">',
          '<div data-region="logo"></div>',
          '<h1 data-region="header"></h1>',
          '<h2 data-region="description"></h2>',
          '</header>'
        ].join("")

  //  public

  //  private

});