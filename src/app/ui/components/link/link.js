/*
  @name:        /app/ui/components/link/link

  @description: prototype for an link components
                
  @author:      Simon Jefford
  
*/
"use strict";
var object      = require("object"),
    sys         = require("sys"),
    component   = require("/app/ui/components/proto"),
    $           = require("/lib/dom").$;

module.exports = object.create(component, {
  
  //  properties
  html: '<a class="components link" data-region="default"></a>',

  //  public
  update: function(data) {

    this.rootNode.setAttribute("data-event", data);
    this.rootNode.setAttribute("href", data);

  },

  //  private

  /*
    @description  get the value of the data to be bound
                  picks the publish url if it exists, otherwise
                  queries the stateMachine to get the value of the URL we are binding to
  */
  _getValue: function(state) {
    
    var e;

    if(this.publish) {
      return this.publish;
    }

    e = sys.fire("/state/uri/requested", {
      state: state
    });
    return e.data.state.uri;

  }

});