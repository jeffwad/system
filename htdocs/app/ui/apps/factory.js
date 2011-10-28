

define("/app/ui/apps/factory",

	["object","sys","/app/ui/apps/entry/proto","/app/ui/apps/footer/proto","/app/ui/apps/header/proto","/app/ui/apps/list/proto","/app/ui/apps/nav/proto"],

	function(require, exports, module) {

		var object  = require("object"),
		    sys     = require("sys"),
		    apps    = {
		      "entry"  : require("/app/ui/apps/entry/proto"),
		      "footer" : require("/app/ui/apps/footer/proto"),
		      "header" : require("/app/ui/apps/header/proto"),
		      "list"   : require("/app/ui/apps/list/proto"),
		      "nav"    : require("/app/ui/apps/nav/proto")
		    };
		
		exports.create = function(data) {
		  
		  var app = apps[data.object].proto;
		
		  if(typeof app === "undefined") {
		    console.log("app/ui/apps/factory cannot create object: " + data.object);
		    throw new TypeError("app/ui/apps/factory cannot create object: " + data.object);
		  }
		  return object.create(app).init(data);
		
		};
	}

);