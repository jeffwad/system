/*
	@name: 			  pageRegistry

	@description:	a collection of pages

	@author:		  Simon Jefford
	
*/
var events         = require("events"),
    object         = require("object"),
    //pagePrototype  = requ ire("/lib/core/page"),
    reduce         = require("iter").reduce,
    pages;


exports.load = function(pageDefinitions) {
  
  pages = reduce(pageDefinitions, function(ret, page) {
    
    var p;
    
    if(typeof page.components !== "undefined") {
      
      p = ret[page.uuid] = object.create(pagePrototype).init(page.components.page);
      p.loadZones(page.components.zones)
      p.loadApps(page.components.app_types);
      
    }
    
    return ret;
    
  }, {});
  
};

exports.get = function(uuid) {
  return pages[uuid];
};
