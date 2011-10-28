/*
	@name: 				  frontController

	@description: 	Start the application by listening for url changes


	@author: 			  Simon Jefford

*/
var sys                   = require("sys"),
  	hashchange            = false,
    currentHash           = "",
    frontController,
    controller;


//	returns the hash value of the URL	
function getHash() {
	return window.location.hash.toString();
}

//	sets the hash value of the URL	
function setHash(hash) {
	window.location.hash = hash;
}


//	test location - if it has changed then stop monitoring and fire the DISPATCH_URL event
function testLocation() {
	var hash = getHash();
	if(hash !== currentHash) {
		stop();
		dispatchURL(hash);
		currentHash = hash;
		start();
	}
}

if ("onhashchange" in window) {
	hashchange = true;
	window.onhashchange = testLocation;	
}


//	call the dispatcher with a DISPATCH_URL message
function dispatchURL(hash) {

	sys.fire("system.dispatch.url", {
		url: hash
	});

}

//	start monitoring the URL
function start() {
	testLocation();
	if(!hashchange) {
		controller = setTimeout(arguments.callee, 30);
	}
}	

//	stop monitoring the URL
function stop() {
	clearInterval(controller);
}

//	the frontControllers starter motor
exports.run = function() {
	start();
};
  
