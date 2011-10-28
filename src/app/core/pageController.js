/*
	@name: 			pageController

	@description:	master page manipulator

	@author:		Simon Jefford
	
*/
var sys           = require("sys"),
    pageRegistry  = require("/lib/core/pageRegistry"),
    currentPage;
      
  
function loadPage(page) {

  var nextPage = pageRegistry.get(page.data.uuid); 
  
  if(currentPage) {
    currentPage.hideBody();
  }
  else {
    nextPage.renderHeader();
  }
  
  if(nextPage.isInitialised) {
    nextPage.showBody();
  }
  else {
    nextPage.renderBody();
  }

  if(!currentPage) {
    nextPage.renderFooter();
  }
  
  currentPage = nextPage;
  
}

sys.on("system.load.page", loadPage);

