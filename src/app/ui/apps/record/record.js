/*
  @name:        /app/ui/apps/record/record

  @description: prototype for a record app
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    app     = require("/app/ui/apps/proto"),
    $       = require("/lib/dom").$;

module.exports = object.create(app, {
  
  //  properties
  html: '<div class="apps record" data-region="default"></div>',

  dataEvent: "data-record"

  //  public

  //  private

});