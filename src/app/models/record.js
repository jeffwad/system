/*
  @name:         /app/models/repcrd

  @description:  record model

  @author:       Simon Jefford
  
*/
"use strict";

var object    = require("object"),
    forEach   = require("iter").forEach,
    model     = require("/app/models/proto").proto,
    component = require("/app/models/component");


object.mixin(exports, object.create(model).init({
  
  apis : {
    get  : "/api/data-record",
    find : "/api/data-list"
  },

  instance: {

    init: function(data) {

      var that = this;

      //  create the components
      this._createComponents(data.components);
      delete data.components;

      forEach(data, function(value, attr) {
        that[attr] = function() {
          return {
            value: function() {
              return value;
            }
          };
        };
      });

      return this;

    },

    _createComponents: function(components) {
      
      var that = this;

      forEach(components, function(componentData, attr) {
        
        that[attr] = function() {
          return component.create(componentData);
        };

      });

    }
  }

}));