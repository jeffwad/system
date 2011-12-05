/*
  @name:        ui/components/proto

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

    this.binding = data.binding || false;

    return this;

  },


  /*
    @description  updates the app
                  to be implmented by an object further up the prototype chain
    @param        {object} e
  */
  update: function() {

    throw new Error("component must implement 'update()'");      

  },


  //  private

  /*
    @description  retrieves the data from the state object model
                  basic getter - returns only the value
                  for more complex data/component combinations override
                  further up the prototype chain
    @param        {object} state
    @return       value
  */
  _getValue: function(state) {

    if(state.model[this.binding]) {

      return state.model[this.binding]().value();
    
    }
    return false;


  },



  /*
    @description  tells the components child objects to update
                  to be implemented by an object further 
                  up the prototype chain if needed
    @param        {object} e
  */
  _updateChildren: function(e) {},



  //  auto bound event handlers

  /*
    @description  responds to a state change event and
                  calls update on the component
                  and updates our children
    @param        {object} e
  */
  "/state/app/updated": function(e) {

    if(this.binding) {
      this.update(this._getValue(e.data.state));
    }

    this._updateChildren(e);

  }

});