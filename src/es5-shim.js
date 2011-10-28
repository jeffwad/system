/*
  @name:          es5-shim.js

  @description:   a wee helper file for the forgotten...
  
  @author:        Simon Jefford
  
*/
(function() {


  if(typeof Object.create !== "function") {
    
    var F = function(){};

    /*
    *    @name:         isPrototypeOf
    *    @function:     Tests to see if an object is on the prototype chain of another object
    *    @param:        [object] {object} object whose prototype chain we check
    *    @param:        [object] {prototype} the prototype we are testing
    *    @return:       [boolean]     
    *
    */
    function isPrototypeOf(object, prototype) {

      if(!object || typeof object.__proto__ === "undefined") {
        return false;
      }

      if(object.__proto__ === prototype) {
        return true;
      }
      else {
        return isPrototypeOf(object.__proto__, prototype);
      }

    }





    /*
    *    @name:        Object.create
    *    @method:      creates a new object whose prototype chain points to the prototype object
    *                  and whose properties are the values on the descriptor object
    *    @param:       [object] {prototype} prototype object
    *    @param:       [object] {descriptor} property descriptor object
    *    @return:      [object] {object} newly created object
    *
    */
    Object.create = function(prototype, descriptor) {

      if(typeof prototype !== "object") {
          throw new TypeError("Object prototype may only be an Object or null");
      }

      var i, object;

      //  set the new objects prototype
      F.prototype = prototype;

      //  set an isPrototypeOf method on the prototype if it doesn't already exist
      if(typeof F.prototype.isPrototypeOf !== "function") {

        F.prototype.isPrototypeOf = function(object) {
          return isPrototypeOf(object, this);
        };

      }

      //  create a new object
      object = new F();

      //  set the __proto__ property of the new object to equal our prototype
      object.__proto__ = prototype;

      //  set the prototype of our new object to equal itself to force the __proto__ property 
      //  onto the prototype chain so it works correctly with hasOwnProperty
      F.prototype = object;
      object = new F();

      if(descriptor) {
        for(i in descriptor) {
          object[i] = descriptor[i].value;
        }
      }

      return object;

    };

  }


  if(typeof Object.getPrototypeOf !== "function") {

    /*
    *    @name:     Object.getPrototypeOf
    *    @method:      Returns the prototype of a given object
    *    @param:       [object] {obj} object whose prototype we return
    *    @return:     [object] {proto} prototype object
    *
    */
    Object.getPrototypeOf = function(obj) {

      if(typeof obj !== "object") {
          throw new TypeError("Object.getPrototypeOf called on non-object");
      }
      return obj.__proto__ || Object.prototype;
    }

  }




  if(typeof Object.keys !== "function") {

    (function(){

      /*
      *    @name:         Object.keys
      *    @method:      returns an array of enumerable key names
      *    @param:       [object] {obj} object whose keys we want
      *    @return:      [array] {keys} array of keys
      *
      */
      var hasDontEnumBug = true,
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          key;

      for (key in {"toString": null}) {
        hasDontEnumBug = false;
      }
      
      Object.keys = function (object) {

        var keys, name, i, dontEnum;

        if(typeof object !== "object" && typeof object !== "function" || object === null) {
          throw new TypeError("Object.keys called on a non-object");
        }
        
        keys = [];
        for (name in object) {
          if(object.hasOwnProperty(name)) {
            keys.push(name);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnums.length; i++) {
            dontEnum = dontEnums[i];
            if(object.hasOwnProperty(dontEnum)) {
              keys.push(dontEnum);
            }
          }
        }

        return keys;
      };

    }());

  }

})();
