/*
  @name:        ui/apps/proto

  @description: prototype for all layout ui objects
                
  @author:      Simon Jefford
  
*/
var object  = require("object"),
    ui      = require("/app/ui/proto"),
    $       = require("/lib/dom").$;

//  create our prototype ui entity based on the ui/proto object
exports.proto = object.create(ui.proto, {
  
  //  properties
  init: function() {
    this.callProto("init", arguments);
    return this;
  }


  //  public

  //  private

});