

define("/app/ui/proto",

	["object","events","iter","/lib/dom"],

	function(require, exports, module) {

		var object  = require("object"),
		    events  = require("events"),
		    iter    = require("iter"),
		    some    = iter.some,
		    forEach = iter.forEach,
		    $       = require("/lib/dom").$;
		
		//  create our prototype ui entity based on the event object
		exports.proto = object.create(events.proto, {
		  
		  //  properties
		
		
		  //  public
		
		  /*
		    @description  initialises the object
		    @param        {string} uuid
		  */
		  init: function(data) {
		
		    this.uuid = data.uuid;
		    this.region = data.region;
		    this.entityType = data.type + "/" + data.object;
		    this.callProto("init");
		    this.children = [];
		    return this;
		
		  },
		
		
		  /*
		    @description  fires an event in this scope with phase = "bubble"
		    @param        {object} e event object
		  */
		  bubble: function(e) {
		    
		    e.phase = "bubble";
		    this._fire(e);
		
		  },
		
		
		  /*
		    @description  fires an event in this scope with phase = "capture"
		    @param        {object} e event object
		  */
		  capture: function(e) {
		    
		    e.phase = "capture";
		    this._fire(e);
		
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
		    @description  checks that all the render data is correct and then delegates to a private render method
		    @param        {domNode} root 
		  */
		  render: function(root) {
		    
		    if(typeof this.html === "undefined") {
		      throw new Error("ui/proto#html has not been set");
		    }
		
		    this.rootNode = document.createElement("div");
		    this.rootNode.innerHTML = this.html;
		    this.rootNode = $(" > *", this.rootNode)[0];
		
		    this._renderChildren();      
		
		    //  if we were passed a root node, append to it
		    if(root) {
		      root.appendChild(this.rootNode);
		    }
		  
		  },
		
		
		  //  private
		
		
		  /*
		    @description  fires an event up and down it's child and parent objects
		    @param        {object} e event object
		  */
		  _fire: function(e) {
		
		    var initial = e.phase ? false : true;
		
		    //  call any listeners on this scope - if the event is stopped return false
		    this.callProto("_fire", [e]);
		    if(e.propogationStopped) {
		      return e;
		    }
		
		    //  broadcast to our children
		    if(initial || e.phase === "capture") {
		      some(this.children, function(child) {
		        child.capture(e);
		        return e.propogationStopped;
		      }); 
		    }
		
		    //  if the event is not stopped then broadcast to the parent
		    if(!e.propogationStopped && ((initial || e.phase === "bubble") && this.parent)) {
		      this.parent.bubble(e);
		    }
		    
		    return e;
		  },
		
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
	}

);