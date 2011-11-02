/*
  @name:        core/parser

  @description: recursively builds a tree/stack of objects from a JSON source
                
  @author:      Simon Jefford
  
*/
var sys     = require("sys"),
    iter    = require("iter"),
    forEach = iter.forEach;

exports.proto = {
  
  //  public

  /*
    @description  initialises the object
    @param        {object} entityFactory
  */
  init: function(entityFactory) {

    this._factory = entityFactory;
    return this;
  },

  walk: function(data) {

    return this._createEntity(data);
    
  },

  _createEntity: function(data) {

    var that = this,
        entity, 
        children;
    
    entity = this._factory.create(data);

    children = this._factory.getChildren(data);

    if(children) {

      forEach(children, function(child) {
        
        that._factory.addChild(entity, that._createEntity(child));

      });
    
    }
    
    return entity;
  }

};
