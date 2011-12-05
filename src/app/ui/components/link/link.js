/*
  @name:        /app/ui/components/link/link

  @description: prototype for an link components
                
  @author:      Simon Jefford
  
*/
"use strict";
var object      = require("object"),
    component   = require("/app/ui/components/proto").proto,
    $           = require("/lib/dom").$;

exports.proto = object.create(component, {
  
  //  properties
  html: '<a class="components link" data-region="default"></a>',

  //  public
  update: function(data) {

    this.rootNode.setAttribute("data-event", this.publish);
    this.rootNode.setAttribute("href", this.publish);

  },

  //  private


  _getValue: function(state) {
    
    var value = component._getValue.call(this, state);
    if(!value) {
      value = this.publish;
    }
    return value;

  }

});