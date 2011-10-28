

define("/app/ui/factory",

	["/app/ui/layouts/factory","/app/ui/apps/factory","/app/ui/components/factory"],

	function(require, exports, module) {

		var factories = {
		      layouts     : require("/app/ui/layouts/factory"),
		      apps        : require("/app/ui/apps/factory"),
		      components  : require("/app/ui/components/factory")
		    };
		
		exports.create = function(data) {
		    
		  var fac = factories[data.type];
		  
		  if(typeof fac === "undefined") {
		    console.log("app/ui/factory cannot load factory of type: " + data.type);
		    throw new TypeError("app/ui/factory cannot load factory of type: " + data.type);
		  }
		
		  return fac.create(data);
		
		};
	}

);