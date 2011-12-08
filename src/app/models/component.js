/*
  @name:         /app/models/repcrd

  @description:  record model

  @author:       Simon Jefford
  
*/
"use strict";

var object    = require("object"),
    model     = require("/app/models/proto"),
    forEach   = require("iter").forEach;


module.exports = object.create(model).init({
  
  apis : {
    get: "/api/data-component"
  },

  instance: {

    init: function(data) {

      var that = this;

      forEach(data, function(value, attr) {

        that[attr] = function() {return value;};

      });

      return this;

    }
  }
});