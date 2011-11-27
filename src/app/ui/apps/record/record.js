/*
  @name:        /app/ui/apps/record/record

  @description: prototype for a record app
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    app     = require("/app/ui/apps/proto").proto,
    $       = require("/lib/dom").$;

exports.proto = object.create(app, {
  
  //  properties
  html: '<div class="apps record" data-region="default"></div>',

  _dataEvent: "data-record"

  //  public

  //  private

});