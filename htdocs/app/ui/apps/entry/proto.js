

define("/app/ui/apps/entry/proto",

	["object","/app/ui/apps/proto","/lib/dom"],

	function(require, exports, module) {

		var object  = require("object"),
		    apps    = require("/app/ui/apps/proto"),
		    $       = require("/lib/dom").$;
		
		exports.proto = object.create(apps.proto, {
		  
		  //  properties
		  html: '<div class="apps entry" data-region="default"></div>'
		
		  //  public
		
		  //  private
		
		});
	}

);