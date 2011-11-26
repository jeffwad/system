/*
  @name:         main

  @description:  kicks off the application

  @author:       Simon Jefford
  
*/
var object        = require("object"),
    sys           = require("sys"),
    site          = require("/app/site"),
    ui;

//  build the ui from the site tree
ui = site.build();

//  render the ui
ui.render(document.body);