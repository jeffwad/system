/*
  @name:        ui/layouts/section/stack

  @description: prototype for a section layout
                
  @author:      Simon Jefford
  
*/
"use strict";
var object  = require("object"),
    layout = require("/app/ui/layouts/proto").proto,
    iter    = require("iter"),
    forEach = iter.forEach,
    some    = iter.some,
    $       = require("/lib/dom").$;

exports.proto = object.create(layout, {
  
  //  properties
  html: '<div class="layouts section" data-region="default"></div>',

  //  public

 
  //  private

  /*
    @description  plucks the selected child from the children array
    @param        {object} e
    @return       {child} object
   */
  _getSelectedChild: function(e) {
  
    var selected;

    some(this.children, function(child) {
      selected = child;
      return child.subscribe === e.data.publish;
    });
    
    return selected;
    
  },


 /*
    @description  displays the selected child and hides the others
    @param        {object} child
   */
  _selectChild: function(child) {
    
    forEach(this.children, function(child) {
      child.hide();
    });
    
    child.show();
    
  },

 
  //  auto bind event handlers

  /*
    @description  responds to a state change event and displays the associated child
    @param        {object} e
  */
  "__state.control.change__": function(e) {

    var selectedChild = this._getSelectedChild(e);

    if(this._currentChild !== selectedChild) {
      this._selectChild(selectedChild);
      this._currentChild = selectedChild;
    }

  }

});