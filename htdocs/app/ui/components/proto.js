

define("/app/ui/components/proto",

	["object","/app/ui/proto","/lib/dom"],

	function(require, exports, module) {

		var object  = require("object"),
		    ui      = require("/app/ui/proto"),
		    $       = require("/lib/dom").$;
		
		//  create our prototype ui entity based on the ui/proto object
		exports.proto = object.create(ui.proto, {
		  
		  //  properties
		
		
		  //  public
		
		  //  private
		
		});
	}

);