/*
  @name:        ui/apps/proto

  @description: prototype for all layout ui objects
                
  @author:      Simon Jefford
  
*/
"use strict";

var object  = require("object"),
    sys     = require("sys"),
    forEach = require("iter").forEach,
    ui      = require("/app/ui/proto"),
    $       = require("/lib/dom").$;

//  create our prototype ui entity based on the ui/proto object
module.exports = object.create(ui, {
  
  //  properties
  events: {
    update: "/state/app/updated"
  },

  //  public

  /*
    @description  set up initial params
    @param        {object} data
  */
  init: function(data) {
    
    ui.init.call(this, data);

    if(data.bindDataUuid) {
      this._bindDataListener(data.bindDataUuid);
    }

    if(data.stateDataUuids) {
      this._bindStateListeners(data.stateDataUuids);
    }

    return this;
  
  },



  /*
    @description  updates the current object, 
                  and fires an update event to it's children
    @param        {object} e
  */
  update: function(e) {

    this._update(e);
    this._updateChildren(e);

  },


 
  //  private


  /*
    @description  bind data listener to this app based up it's record
                  and dataEvent attributes
    @param        {object} e
  */
  _bindDataListener: function(uuid) {

    var that = this, 
        event = "/bind/" + this.dataEvent;

    sys.once(event + "/" + uuid, function(e) {

      that.update(e);

    });
    
    sys.fire(event + "/requested", {
      uuid: uuid
    });
      
  },


  /*
    @description  binds state listeners to this app based up it's records
                  and dataEvent attributes
    @param        {object} e
  */
  _bindStateListeners: function(uuids) {

    var that = this;
    
    forEach(uuids, function(uuid) {

      var event = "/state/" + that.dataEvent;

      sys.on(event + "/" + uuid + "/updated", function(e) {

        that.update(e);

      });

      sys.fire(event + "/requested", {
        uuid: uuid
      });

    });

  },



  /*
    @description  updates the state of the current app
                  to be implemented by an object further 
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

      child.capture(that.events.update, e.data);

    });

  }

});