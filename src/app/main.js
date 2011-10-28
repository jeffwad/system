/*
  @name:         main

  @description:  kicks off the application

  @author:       Simon Jefford
  
*/
var object        = require("object"),
    sys           = require("sys"),
    site          = require("/app/site"),
    parser        = require("/app/utils/parser/proto"),
    factory       = require("/app/ui/factory"),
    ui;

//  create a generic parser and register it's factory
parser = object.create(parser.proto).init(factory);

//  parse the site object to create the UI tree
ui = parser.parse(site.site.entity);

//  render the ui
ui.render(document.body);