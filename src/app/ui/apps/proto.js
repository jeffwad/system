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
  publish: {
    update: "/app/state/updated"
  },

  //  public

  /*
    @description  set up initial params
    @param        {object} data
  */
  init: function(data) {
    
    ui.init.call(this, data);

    this.records = data.records || false;

    this._bindDataListeners();

    return this;
  
  },



  /*
    @description  updates the current object, 
                  and fires an update event to it's children
    @param        {object} e
  */
  update: function(e) {

    console.log(this.uuid);

    e.stopPropogation();
        
    this._update(e);
    this._updateChildren(e);

  },



  //  private

  /*
    @description  binds data listeners to this app based up it's records
                  and dataEvents attributes
    @param        {object} e
  */
  _bindDataListeners: function() {

    var that = this;

    if(!this.records) {
      return;
    }
    
    forEach(this.records, function(record) {

      that.on("/state/" + that.dataEvent + "/" + record + "/updated", function(e) {

        that.update(e);

      });
      
    });

  },



  /*
    @description  updates the state of the current app
                  to be implmented by an object further 
                  up the prototype chain if needed
    @param        {object} e
  */
  _update: function(e) {},


  /*
    @description  tells the apps child objects to update
    @param        {object} e
  */
  _updateChildren: function(e) {

    var that = this;
    forEach(this.children, function(child) {

      child.capture(that.publish.update, e.data);

    });

  }

});