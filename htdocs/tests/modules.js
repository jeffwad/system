

define("/tests/modules",

	["/tests/specs/app/ui/layouts/proto"],

	function(require, exports, module) {

		
		//  specs
		//r/equire("/tests/specs/events");
		//r/equire("/tests/specs/sys");
		//r/equire("/tests/specs/app/ui/proto");
		require("/tests/specs/app/ui/layouts/proto");
		
		
		
		//  do not delete
		var jasmineEnv, trivialReporter, currentWindowOnload;
		
		function execJasmine() {
		  jasmineEnv.execute();
		}
		
		jasmineEnv = jasmine.getEnv();
		jasmineEnv.updateInterval = 1000;
		
		trivialReporter = new jasmine.TrivialReporter();
		
		jasmineEnv.addReporter(trivialReporter);
		
		jasmineEnv.specFilter = function(spec) {
		  return trivialReporter.specFilter(spec);
		};
		
		currentWindowOnload = window.onload;
		
		window.onload = function() {
		  if (currentWindowOnload) {
		    currentWindowOnload();
		  }
		  execJasmine();
		};
		
		
	}

);