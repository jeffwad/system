

define("/app/ui/apps/nav/proto",

	["object","/app/ui/apps/proto","/lib/dom"],

	function(require, exports, module) {

		var object  = require("object"),
		    apps    = require("/app/ui/apps/proto"),
		    $       = require("/lib/dom").$;
		
		exports.proto = object.create(apps.proto, {
		  
		  //  properties
		  html: '<nav class="apps nav" data-region="default"></nav>'
		
		  //  public
		
		  //  private
		
		});
	}

);