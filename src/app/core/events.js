/*
  @name:        /app/core/events

  @description: a list of events used throughout the system

  @author:      Simon Jefford
 */
"use strict";
var forEach = require("iter").forEach,
    system;

function create(event) {
  
  var o = exports,
      data = event.split("/");

  data.shift();

  forEach(data, function(value) {
  
    if(value === data[data.length -1]) {
      o[value] = event;
    } 
    else { 
      if(typeof exports[value] === "undefined") {
        o[value] = {};
      }
      o = o[value];
    }

  });

}

forEach([ 
  //  system
  "/system/app/loaded",
  "/system/data/loaded",
  "/system/ui/initialised",
  "/system/error",

  //  data binding - one shot
  "/binding/data-record/requested",
  "/binding/data-record/updated",
  "/binding/data-record/success",
  "/binding/user-record/requested",
  "/binding/user-record/updated",
  "/binding/user-record/success",

  //  state data binding - continuous monitoring
  "/state/change/requested",
  "/state/change/cancelled",
  "/state/update/requested",
  "/state/updated",
  "/state/app/updated",
  "/state/data-record/requested",
  "/state/data-record/updated",
  "/state/data-record/success"

], create);