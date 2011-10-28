

define("/app/ui/components/image/proto",

	["object","/app/ui/components/proto","/lib/dom"],

	function(require, exports, module) {

		var object      = require("object"),
		    components  = require("/app/ui/components/proto"),
		    $           = require("/lib/dom").$;
		
		exports.proto = object.create(components.proto, {
		  
		  //  properties
		  html: '<img class="components image" data-region="default"></img>'
		
		  //  public
		
		  //  private
		
		});
	}

);