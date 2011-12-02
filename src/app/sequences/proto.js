/*
  @name:        sequence

  @description: core sequence

  @author:      Simon Jefford
 */
"use strict";

var object  = require("object"),
    sys     = require("sys"),
    iter    = require("iter"),
    promise = require("async").promise,
    command = require("/app/commands/proto").proto,
    some    = iter.some,
    forEach = iter.forEach;    
    

//  check that a response status exists and call "process()" with the next action
function next (step, method, res) {

  var nextStep = step[2][res.status];

  if(typeof nextStep !== "undefined") {
    process(nextStep, res.data);
  }
  else {
    throw new Error("Sequence does not recognise current response status: " + res.status);
  }
}


function process(step, data) {

  var cmdName = step[0],
      method  = step[1],
      res, cmd;
  
  //  test to see if we need to fire an event instead
  if(cmdName === "event") {

    sys.fire(method, data);
    
  }
  else {

    //  load the current command
    cmd = object.create(sys.loadCommand(cmdName).proto);

    //  if it isn't a command, abort
    if(!command.isPrototypeOf(cmd)) {
      return false;
    }
    
    //  call the method on the command
    res = cmd[method](data);

    //  if the response is a promise, then register "next()" as a callback
    if(promise.isPrototypeOf(res)) {
      res.then(function(res){
        next(step, method, res);
      });
    }
    //  otherwise call "next()" now
    else {
      next(step, method, res);
    }
    
  }

}

exports.proto = {
  
  init: function(sequence) {

    this.sequence = sequence;
    return this;

  },

  process: function(e) {
    
    process(this.sequence, e.data);
    
  }

};