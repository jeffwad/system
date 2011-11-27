/*
  @name:        /app/ui/apps/header/header

  @description: prototype for a header app
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    app     = require("/app/ui/apps/proto").proto,
    $       = require("/lib/dom").$;

exports.proto = object.create(app, {
  
  //  properties
  html: [
          '<header class="apps header">',
          '<div data-region="logo"></div>',
          '<h1 data-region="header"></h1>',
          '<h2 data-region="description"></h2>',
          '</header>'
        ].join(""),


  dataEvent: "data-site"//,

  //  public

  /*
    @description  set up initial params
    @param        {object} data
  */
  /*init: function(data) {

    app.init.call(this, data);
    return this;

  }*/


  //  private

});