/*
  @name:        /app/ui/apps/footer/footer

  @description: prototype for a footer app
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    app     = require("/app/ui/apps/proto").proto,
    $       = require("/lib/dom").$;

exports.proto = object.create(app, {
  
  //  properties
  html: '<footer class="apps footer" data-region="default"></footer>',

  dataEvent: "data-record"

  //  public

  //  private

});