

define("/app/ui/components/factory",

	["object","sys","/app/ui/components/image/proto","/app/ui/components/link/proto","/app/ui/components/text/proto"],

	function(require, exports, module) {

		var object     = require("object"),
		    sys        = require("sys"),
		    components = {
		      "image" : require("/app/ui/components/image/proto"),
		      "link"  : require("/app/ui/components/link/proto"),
		      "text"  : require("/app/ui/components/text/proto")
		    };
		
		exports.create = function(data) {
		
		  var component = components[data.object].proto;
		
		  if(typeof component === "undefined") {
		    console.log("app/ui/components/factory cannot create object: " + data.object);
		    throw new TypeError("app/ui/components/factory cannot create object: " + data.object);
		  }
		  return object.create(component).init(data);  
		
		};
	}

);