

define("/app/ui/apps/header/proto",

	["object","/app/ui/apps/proto","/lib/dom"],

	function(require, exports, module) {

		var object  = require("object"),
		    apps    = require("/app/ui/apps/proto"),
		    $       = require("/lib/dom").$;
		
		exports.proto = object.create(apps.proto, {
		  
		  //  properties
		  html: '<header class="apps header" data-region="default"></header>'
		
		  //  public
		
		  //  private
		
		});
	}

);