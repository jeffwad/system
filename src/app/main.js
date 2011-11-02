/*
  @name:         main

  @description:  kicks off the application

  @author:       Simon Jefford
  
*/
var object        = require("object"),
    sys           = require("sys"),
    site          = require("/app/site"),
    recursor      = require("/app/utils/recursor/proto"),
    factory       = require("/app/ui/factory"),
    ui;

//  create a generic recursor and register it's factory
recursor = object.create(recursor.proto).init(factory);

//  walk the site object to create the UI tree
ui = recursor.walk(site.site.root);

//  render the ui
ui.render(document.body);