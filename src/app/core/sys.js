/*
	@name: 			sys

	@description:	system utilities

	@author:		Simon Jefford
 */
var events = require("events"),
    object = require("object"),
    sys;

sys = object.create(events).init();

//	copy sys onto exports
object.mixin(exports, sys);

