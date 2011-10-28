/*
	@name: 			route

	@description:	routing object

	@author:		Simon Jefford
	
*/
exports.init = function(route) {

  var pattern;
    
  if(route.current_url === "") {
    pattern = new RegExp("^#!p=/$");
  }
  else {
    pattern = new RegExp("^#!p=" + route.current_url.replace(":slug","(\.+)") + "$") //  cheap regex for prototype purposes
  }

  this.pattern = pattern;
  this.data = {
 	  uuid: route.uuid,
    name: route.name
  }
  
	return this;

}

