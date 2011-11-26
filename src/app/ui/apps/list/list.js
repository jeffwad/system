/*
  @name:        /app/ui/apps/list/list

  @description: prototype for a list app
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    app     = require("/app/ui/apps/proto").proto,
    $       = require("/lib/dom").$;

exports.proto = object.create(app, {
  
  //  properties
  html: '<ul class="apps list" data-region="default"></ul>'

  //  public

  //  private

});