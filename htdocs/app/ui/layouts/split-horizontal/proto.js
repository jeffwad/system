

define("/app/ui/layouts/split-horizontal/proto",

	["object","/app/ui/layouts/proto","/lib/dom"],

	function(require, exports, module) {

		var object  = require("object"),
		    layouts = require("/app/ui/layouts/proto"),
		    $       = require("/lib/dom").$;
		
		exports.proto = object.create(layouts.proto, {
		  
		  //  properties
		  html: '<div class="layouts split-horizontal" data-region="default"></div>'
		
		  //  public
		
		  //  private
		
		});
	}

);