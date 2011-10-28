/*
	@name: 			app

	@description:	application controller

	@author:		Simon Jefford
	
*/
exports.init = function(sys, container, app, appType, rootNode) {
    
  this.sys        = sys;
  this.app        = app;
  this.appType    = appType;
  this.rootNode   = rootNode;
  this.container  = container;
   
  this.views = {};
  this.models = {};

  /*  
    can now do: 
      this.sys.on("sys.event")                // system specific event
      this.container.on("container.event")    // container specific events
      this.app.on("app.event")                // app specific events
  */  


};

//  this called once when the app is first rendered.
exports.render = function() {

  throw new Error("app must implement render() method")

};
    
exports.initViews = function() {
 
  throw new Error("app must implement initViews() method")
      
};


