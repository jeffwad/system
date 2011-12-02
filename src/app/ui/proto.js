/*
  @name:        ui/proto

  @description: prototype for all ui objects
                
  @author:      Simon Jefford
  
*/
"use strict";

var object  = require("object"),
    events  = require("events").proto,
    event   = require("events").event,
    iter    = require("iter"),
    some    = iter.some,
    forEach = iter.forEach,
    $       = require("/lib/dom").$;

//  create our prototype ui entity based on the event object
exports.proto = object.create(events, {
  
  //  properties


  //  public

  /*
    @description  initialises the object
    @param        {object} data
  */
  init: function(data) {

    events.init.call(this);

    this.uuid       = data.uuid;
    this.region     = data.region || "";
    this.publish    = data.publish || false;
    this.subscribe  = data.subscribe || false;
    this.entityType = data.type + "/" + data.object;
    this.children   = [];

    return this;

  },



  /*
    @description  sets the event listeners up on the entity
                  tells out children to do the same
  */
  addEventListeners: function() {

    this._addEventListeners();

    forEach(this.children, function(child) {
      
      child.addEventListeners();

    });

  },



  /*
    @description  fires an event in this scope with phase = "bubble"
    @param        {object} e event object
  */
  bubble: function(type, data) {
    
    var e = object.create(event).init(type, data);
    e.phase = "bubble";
    this._fire(e);

  },


  /*
    @description  fires an event in this scope with phase = "capture"
    @param        {object} e event object
  */
  capture: function(type, data) {
    
    var e = object.create(event).init(type, data);
    e.phase = "capture";
    this._fire(e);

  },



  /*
    @description  hides the ui entity
  */
  hide: function() {
    $(this.rootNode).hide();
  },



  /*
    @description  registers a child ui object with this object
    @param        {object} child an object implementing this on it's prototype
  */
  registerChild: function(child) {
    
    if(!exports.proto.isPrototypeOf(child)) {
      throw new TypeError("UI object must implement ui/proto");
    }
    this.children.push(child);

  },


  /*
    @description  registers a set of child ui objects with this object
    @param        {object} children in iterable set of children
  */
  registerChildren: function(children) {
    
    var that = this;

    forEach(children, function(child, i) {

      that.registerChild(child);
      child.registerParent(that);

    });

  },



  /*
    @description  registers a parent ui object with this object
    @param        {object} parent an object implementing this on it's prototype
  */
  registerParent: function(parent) {
    
    if(!exports.proto.isPrototypeOf(parent)) {
      throw new TypeError("UI object must implement ui/proto");
    }
    this.parent = parent;

  },



  /*
    @description  checks that all the render data is correct and then delegates to a private _render method
    @param        {domNode} root 
  */
  render: function(root) {
    
    if(typeof this.html === "undefined") {
      throw new Error("ui/proto#html has not been set");
    }

    this._render();
    this._renderChildren();      

    //  if we were passed a root node, append to it
    if(root) {
      root.appendChild(this.rootNode);
    }
  
  },


  /*
    @description  shows the ui entity
  */
  show: function() {
    $(this.rootNode).show();
  },



  //  private



  /*
    @description  sets up our event listeners
  */
  _addEventListeners: function() {},


  /*
    @description  propogates an event in this scope with phase = "bubble"
    @param        {object} e event object
  */
  _bubble: function(e) {
    
    e.phase = "bubble";
    this._fire(e);

  },


  /*
    @description  propogates an event in this scope with phase = "capture"
    @param        {object} e event object
  */
  _capture: function(e) {
    
    e.phase = "capture";
    this._fire(e);

  },


  /*
    @description  fires an event up and down it's child and parent objects
    @param        {object} e event object
  */
  _fire: function(e) {

    var initial = e.phase ? false : true;

    //  call any listeners on this scope - if the event is stopped return false
    events._fire.call(this, e);    
    if(e.propogationStopped) {
      return e;
    }

    //  broadcast to our children
    if(initial || e.phase === "capture") {
      some(this.children, function(child) {
        child._capture(e);
        return e.propogationStopped;
      }); 
    }

    //  if the event is not stopped then broadcast to the parent if there is one
    if(!e.propogationStopped && ((initial || e.phase === "bubble") && this.parent)) {
      this.parent._bubble(e);
    }
    
    return e;
  },


  /*
    @description  renders it's template and sets the rootNode
  */
  _render: function() {

    this.rootNode = document.createElement("div");
    this.rootNode.innerHTML = this.html;
    this.rootNode = $(" > *", this.rootNode)[0];

  },


  /*
    @description  renders all registered children into the specified or default regions
                  of it's rootNode
  */
  _renderChildren: function() {
    
    var that = this;

    forEach(this.children, function(child) {

      var container, region;

      region = child.region || "default";
      if(that.rootNode.getAttribute("data-region") === region) {
        container = that.rootNode;
      }
      else {
        container = $('*[data-region="' + region + '"]', that.rootNode)[0];
      }
      if(typeof container === "undefined") {
        throw new Error(that.entityType + "#render region '" + region + "'' does not exist");
      }
      
      child.render();
      container.appendChild(child.rootNode);

    });
    
  }


});