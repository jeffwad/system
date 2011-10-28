/*
	@name: 			   command

	@description:	 base command

	@author:		   Simon Jefford
	
*/
var sys     = require("sys");

exports.CMD_OK            = 100;
exports.CMD_ERROR         = 500;
exports.CMD_INVALID_DATA  = 100;
exports.CMD_OK            = 100;

exports.execute = function() {
    
    throw new Error("Command must implement execute() method");

};

exports.undo = function() {
    
    throw new Error("Command must implement undo() method");

};

forEach(["on", "once"], function(method) {
  
  exports[method] = function(event) {
    
    var that = this;

    return sys[method](event, function(data) {
      
      that.execute(data);

    });

  }

});