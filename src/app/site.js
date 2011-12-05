/*
  @name:        site

  @description: site model
                
  @author:      Simon Jefford
  
*/
"use strict";

var iter      = require("iter"),
    imap      = iter.imap,
    forEach   = iter.forEach,
    range     = iter.range,
    site      = require("/app/tree"),
    factories = require("/app/ui/factories");


/*
  @description  creates a ui entity
  @param        {object} data
  @return       ui entity
*/
function create(data) {
    
  var fac = factories[data.type];
  
  if(typeof fac === "undefined") {
    throw new TypeError("app/ui/factory cannot load factory of type: " + data.type);
  }

  return fac.create(data);

}


/*
  @description  recurses through the site tree and builds a set of ui entities
                if the recursion encounters an entity with a limit value
                then it is generated that many times
  @param        {object} data
  @return       ui entity
*/
function build(data, i) {

  var entity = create(data);
  forEach(range(0, data.limit || 1), function() {
    entity.registerChildren(imap(data.children, build));
  });
  return [entity, i];

}



exports.build = function() {
    
  return build(site.tree.root, 0)[0];

};