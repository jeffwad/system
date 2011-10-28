

define("/app/ui/components/link/proto",

	["object","/app/ui/components/proto","/lib/dom"],

	function(require, exports, module) {

		var object      = require("object"),
		    components  = require("/app/ui/components/proto"),
		    $           = require("/lib/dom").$;
		
		exports.proto = object.create(components.proto, {
		  
		  //  properties
		  html: '<a class="components link" data-region="default"></a>'
		
		  //  public
		
		  //  private
		
		});
	}

);