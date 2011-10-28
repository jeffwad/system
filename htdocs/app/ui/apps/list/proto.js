

define("/app/ui/apps/list/proto",

	["object","/app/ui/apps/proto","/lib/dom"],

	function(require, exports, module) {

		var object  = require("object"),
		    apps    = require("/app/ui/apps/proto"),
		    $       = require("/lib/dom").$;
		
		exports.proto = object.create(apps.proto, {
		  
		  //  properties
		  html: '<ul class="apps list" data-region="default"></ul>'
		
		  //  public
		
		  //  private
		
		});
	}

);