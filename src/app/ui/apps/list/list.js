/*
  @name:        /app/ui/apps/list/list

  @description: prototype for a list app
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    forEach = require("iter").forEach,
    app     = require("/app/ui/apps/proto"),
    $       = require("/lib/dom").$;

module.exports = object.create(app, {
  
  //  properties
  html: '<ul class="apps list" data-region="default"></ul>',

  dataEvent: "data-list",

  //  public
  init: function(data) {
  
    app.init.call(this, data);

    return this;

  },

  //  private

  /*
    @description  tells the apps child objects to update
    @param        {object} e
  */
  _updateChildren: function(e) {

    var that = this;
    forEach(this.children, function(child, i) {
      
      if(i < e.data.state.list.length) {

        e.data.state.model = e.data.state.list[i];
        
        child.capture(that.events.update, e.data);
        child.show();

      }
      else {
        child.hide();
      }
    });

  } 

});