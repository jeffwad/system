/*
  @name:        /app/ui/apps/nav/nav

  @description: prototype for a navigation app
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    sys     = require("sys"),
    app     = require("/app/ui/apps/proto"),
    $       = require("/lib/dom").$;

module.exports = object.create(app, {
  
  //  properties
  html: '<nav class="apps nav" data-region="default"></nav>',

  dataEvent: "data-record",

  //  public

  //  private


  /*
    @description  sets up our event listeners
  */
  _addEventListeners: function() {

    $(this.rootNode).on("click", "a", function(e) {
      
      e.preventDefault();

      sys.fire("/state/change/requested", {

        publish: e.boundTarget.getAttribute("data-event")

      });

    });

  }

});