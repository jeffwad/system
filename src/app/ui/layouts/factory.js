/*
  @name:         app/ui/layouts/factory

  @description:  a factory that creates UI layouts

  @author:       Simon Jefford
  
*/
var object  = require("object"),
    sys     = require("sys"),
    layouts = {
      "section"           : require("/app/ui/layouts/section/proto"),
      "split-horizontal"  : require("/app/ui/layouts/split-horizontal/proto"),
      "split-vertical"    : require("/app/ui/layouts/split-vertical/proto")
    };

exports.create = function(data) {

  var layout = layouts[data.object].proto;

  if(typeof layout === "undefined") {
    throw new TypeError("app/ui/layouts/factory cannot create object: " + data.object);
  }
  return object.create(layout).init(data);  

};