/*
  @name:         main

  @description:  kicks off the application

  @author:       Simon Jefford
  
*/
"use strict";

var sys = require("sys");



//  sequences
require("/app/sequences/site/init");
require("/app/sequences/state/process");

//  data
require("/app/sequences/bind/record");
require("/app/sequences/state/list");


sys.fire("/system/app/loaded");