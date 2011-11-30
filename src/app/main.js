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

//  models
require("/app/sequences/models/site");


sys.fire("/system/app/loaded");