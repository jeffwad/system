/*
  @name:        /app/ui/apps/entry/entry

  @description: prototype for an entry app
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    app     = require("/app/ui/apps/proto").proto,
    $       = require("/lib/dom").$;

exports.proto = object.create(app, {
  
  //  properties
  html: '<div class="apps entry" data-region="default"></div>'

  //  public

  //  private

});