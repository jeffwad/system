/*
  @name:        /app/ui/components/text/text

  @description: prototype for a text component
                
  @author:      Simon Jefford
  
*/
"use strict";
var object      = require("object"),
    component   = require("/app/ui/components/proto").proto,
    $           = require("/lib/dom").$;

exports.proto = object.create(component, {
  
  //  properties
  html: "",

  //  public
  update: function(text) {
        
    var textNode = document.createTextNode(text);
    this._text.parentNode.replaceChild(textNode, this._text);
    this._text = textNode;

  },

  //  private

  _render: function() {
    
    this.rootNode = document.createDocumentFragment();
    this._text = document.createTextNode("");
    this.rootNode.appendChild(this._text);
  }


});