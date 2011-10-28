/*
	@name: 			  sequence

	@description:	core sequence

	@author:		  Simon Jefford
 */
var sys     = require("sys"),
    some    = require("iter").some,
    forEach = require("iter").forEach,
    promise = require("async").promise,
    command = require("/lib/core/command");
    

//  check that a response status exists and call "process()" with the next action
function next (action, method, res) {

  var next = action[method][res.status];

  if(typeof next !== "undefined") {
    process(next, res.data);
  }
  else {
    throw new Error("Sequence does not recognise current response status: " + res.status);
  }
}

function process(action, data) {

  //  test to see if we are executing or undoing...  
  if(!some(["execute", "undo"], function(method) {

    var res, cmd;
    
    //  load the current command
    cmd = sys.loadCommand(action[method]);

    //  if it isn't a command, abort
    if(!command.isPrototypeOf(cmd)) {
      return false;
    }
    
    //  call the method on the command
    res = cmd[method](data);

    //  if the response is a promise, then register "next()" as a callback
    if(promise.isPrototypeOf(res)) {
      res.then(function(res){
        next(action, method, res);
      });
    }
    //  otherwise call "next()" now
    else {
      next(action, method, res);
    }
    return true;

  })) {

    //  if we are not dealing with a command test to see if we have an event
    if (typeof action.event !== "undefined"){

      sys.fire(action.event, data);

    }
    //  throw an error as we must have a command or event... 
    else {
      throw new Error("Sequence must define command or event");
    }

  }

}

exports.init = function(sequence) {

  this.sequence = sequence;
  return this;

};

forEach(["on", "once"], function(method) {
  
  exports[method] = function(event) {
    
    var seq = this.sequence || {};

    return sys[method](event, function(data) {
      
      process(seq, data);

    });

  };

});


