

define("/app/ui/components/text/proto",

	["object","/app/ui/components/proto","/lib/dom"],

	function(require, exports, module) {

		var object      = require("object"),
		    components  = require("/app/ui/components/proto"),
		    $           = require("/lib/dom").$;
		
		exports.proto = object.create(components.proto, {
		  
		  //  properties
		  html: '<p class="components text" data-region="default"></p>'
		
		  //  public
		
		  //  private
		
		});
	}

);