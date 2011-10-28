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

  parse: function(data) {

    return this._createEntity(data);
    
  },

  _createEntity: function(data) {

    var that = this,
        entity, 
        fac,
        children;
    
    entity = this._factory.create(data);

    children = this._getChildren(data);

    if(children) {

      forEach(children, function(child) {
        
        entity.registerChild(that._createEntity(child));

      });
    
    }
    
    return entity;
  },

  _getChildren: function(data) {
    
    return data.children || false

  }

};
