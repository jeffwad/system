/*
  @name:         main

  @description:  kicks off the application

  @author:       Simon Jefford
  
*/
"use strict";
var object        = require("object"),
    sys           = require("sys"),
    site          = require("/app/site"),
    ui, state;

//  build the ui from the site tree
ui = site.build();

//  render the ui
ui.render(document.body);


// test state object
state = {
  
  model: {
    
    name: function(){return {value: function() {return "Simon Jefford";}};},
    description: function(){return {value: function() {return "Bit of a plonker";}};},
    title: function(){return {value: function() {return "Mr";}};}

  }

};

sys.on("test", function() {
  ui.fire("/state/data-record/01234567890/updated", {
    state: state
  });
});