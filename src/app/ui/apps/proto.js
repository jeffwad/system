/*
  @name:        ui/apps/proto

  @description: prototype for all layout ui objects
                
  @author:      Simon Jefford
  
*/
"use strict";

var object  = require("object"),
    forEach = require("iter").forEach,
    ui      = require("/app/ui/proto").proto,
    $       = require("/lib/dom").$;

//  create our prototype ui entity based on the ui/proto object
exports.proto = object.create(ui, {
  
  //  properties

  //  public

  init: function(data) {
    
    ui.init.call(this, data);

    this.records = data.records || false;

    this._bindDataListeners();

    return this;
  
  },

  //  private
  _bindDataListeners: function() {

    var that = this;

    if(!this.records) {
      return;
    }
    
    forEach(this.records, function(record) {

      that.on("/state/" + that._dataEvent + "/" + record + "/update", function(e) {
        
        that.update(e);

      });
      
    });

  }

});