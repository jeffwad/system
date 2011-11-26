/*
  @name:        /app/ui/apps/nav/nav

  @description: prototype for a navigation app
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    app     = require("/app/ui/apps/proto").proto,
    $       = require("/lib/dom").$;

exports.proto = object.create(app, {
  
  //  properties
  html: '<nav class="apps nav" data-region="default"></nav>'

  //  public

  //  private

});