/*
	@name: 			  urlDispatcher

	@description:	fires url change events

	@author:		  Simon Jefford
	
*/

var sys     = require("sys"),
		object 	= require("object"),
    route   = require("/lib/core/route"),
    map	    = require("iter").map,
	  routes;


function dispatchUrl(data) {

	try {

		var url = data.url;

		if(!_.some(routes, function(route) {
      
			var m = url.match(route.pattern);

			if(m) {

				sys.fire("system.load.page", {

					data: route.data,
					params: m
					
				});
				return true;
			}
			return false;
		})) {
			console.warn(url, ": No route match found");
		}

	}
	catch(err) {
		console.error(err);
	}

  
}

exports.loadRoutes = function(config) {

  routes = map(config, function(routing) {
    
    return object.create(route).init(routing);
    
  });
  
}

sys.on("system.dispatch.url", dispatchUrl);

