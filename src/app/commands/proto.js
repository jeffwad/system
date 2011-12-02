/*
  @name:         command

  @description:  base command

  @author:       Simon Jefford
  
*/
"use strict";

var sys     = require("sys"),
    forEach = require("iter").forEach;


exports.proto = {
  
  CMD_OK            : "CMD_OK",
  CMD_CANCELLED     : "CMD_CANCELLED",
  CMD_INVALID_DATA  : "CMD_INVALID_DATA",
  CMD_ERROR         : "CMD_ERROR",

  execute: function() {
    
    throw new Error("command must implement 'execute()'");

  },


  undo: function() {
    
    throw new Error("command must implement 'undo()'");

  }

  
};