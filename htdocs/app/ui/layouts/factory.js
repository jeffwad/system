

define("/app/ui/layouts/factory",

	["object","sys","/app/ui/layouts/section/proto","/app/ui/layouts/split-horizontal/proto","/app/ui/layouts/split-vertical/proto"],

	function(require, exports, module) {

		var object  = require("object"),
		    sys     = require("sys"),
		    layouts = {
		      "section"           : require("/app/ui/layouts/section/proto"),
		      "split-horizontal"  : require("/app/ui/layouts/split-horizontal/proto"),
		      "split-vertical"    : require("/app/ui/layouts/split-vertical/proto")
		    };
		
		exports.create = function(data) {
		
		  var layout = layouts[data.object].proto;
		
		  if(typeof layout === "undefined") {
		    console.log("app/ui/layouts/factory cannot create object: " + data.object);
		    throw new TypeError("app/ui/layouts/factory cannot create object: " + data.object);
		  }
		  return object.create(layout).init(data);  
		
		};
	}

);