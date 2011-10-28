/*
*  @name:          require.js
*
*  @description:   module loader and system utils
*  
*                  prototypal inheritance
*                  iter tools
*                  promise
*                  events
*                  js module loader
*                  web worker spawning
*                  string and function enhancements
*
*  @author:        Simon Jefford
*  
*/

(function(json) {

  if(typeof StopIteration === 'undefined') {
    StopIteration = new Error();
  }
  /*

    define vars

  */ 
  var promise, socket, event, events, sys,
      camelCase, hyphenate, capitalise, interpolate;



  /*
  *    @name:           create
  *    @method:         creates a new object equal to instance whose prototype chain points to the prototype object
  *                     this method copies the instance object on to the new object
  *                     We cache a reference to the proto method if it's going to get overidden
  *                     so callProto works. We aren't using Object.getPrototypeOf as we get caught in
  *                     too much recurssion hell. wtf....
  *    @param:          [object] {prototype} prototype object
  *    @param:          [object] {instance} object
  *    @return:         [object] {object} newly created object
  *
  */
  function create(prototype, instance) {

    var i, object, callProto = false;

    if(typeof prototype.callProto !== "function") {
      prototype = Object.create(prototype);
      prototype.callProto = function(method, args) {
        var m = this[method].callProto;
        return m.apply(this, args);
      };
    }

    object = Object.create(prototype);

    if(typeof instance === "object") {

      for(i in instance) {
        if(typeof object[i] === "function") {
          callProto = object[i];
        }
        object[i] = instance[i];
        if(callProto) {
          object[i].callProto = callProto;
        }
        callProto = false;
        
      }
    }

    return object;

  }



  /*
  *    @name:          mixin
  *    @method:        copies properties from one object to another
  *    @param:         [object] {obj} object to add to
  *    @param:         [object] {mixin} object to copy from
  *
  */
  function mixin(object, mixin) {

    var i;

    for(i in mixin) {
      object[i] = mixin[i];
    }

  }


  /*
  *    @name:          extend
  *    @method:        copies properties from one object to another, ignoring prototype properties
  *    @param:         [object] {obj} object to add to
  *    @param:         [object] {mixin} object to copy from
  *
  */
  function extend(object, mixin) {

    var i;

    for(i in mixin) {
      if(mixin.hasOwnProperty(i)) {  
        object[i] = mixin[i];
      }
    }

  }
  

  /*
  *    @name:           iterator
  *    @method:         creates an iterator from a specified iterable
  *    @param:          [object] object 
  *    @return:         [object] iterator
  *
  */
  function iterator(object){
    
    var iterator = false, i, keys;
    
    if (typeof object.next ==='function') {
      iterator = object;
    }

    else if (typeof object.__iterator__ === "function") {

      iterator = object.__iterator__();
    
    }

    else if(object.length) {

      i = 0;
      iterator = {
        next: function() {
          if (typeof object[i] !== 'undefined') {
            return [object[i], i++];
          }
          throw StopIteration; 
        }
      };

    }
    else {

      try {

        keys = Object.keys(object);
        i = 0;
      
        iterator = {
          next: function() {
            if (typeof keys[i] !== 'undefined') {
              return [object[keys[i]], keys[i++]];
            }
            throw StopIteration; 
          }
        };
      }
      catch(e) {
        iterator = false;
      }


    }
    
    return iterator;
  }




  function exhaust(object, func){

    var i, l, r, iterable;
    try {
      if (typeof object.length === 'number') {
        for(i = 0, l = object.length; i < l; i++) {
          func(object[i], i);
        }
      }
      else {
        iterable = iterator(object);
        if (iterable) {
          i = 0;
          while (true) {
            r = iterable.next();
            func(r[0], r[1]);
          }
        }
        else {
          for(i in object) {
            if(object.hasOwnProperty(i)) {
              func(object[i], i);
            }
          }
        }
      }
    } 
    catch (e) {
      if (e !== StopIteration) {
        throw e;
      }

    }
  }

  function forEach(o, func, scope) {
    if(typeof o.forEach === 'function') {
      o.forEach(func, scope);
    }
    else {
      exhaust(o, function(value, key){
        func.call(scope, value, key);
      });
    }
  }
  
  function filter(o, func, scope) {
    if(typeof o.filter === 'function') {
      return o.filter(func, scope);
    }
    var ret = o.length ? [] : {};
    exhaust(o, function(value, key){
      if (func.call(scope, value, key)) {
        if(o.length) {
          ret.push(value);
        }
        else {
          ret[key] = value;
        }
      }
    });
    return ret;
  }
  
  function map(o, func, scope) {
    if(typeof o.map === 'function') {
      return o.map(func, scope);
    }
    var ret = o.length ? [] : {};
    exhaust(o, function(value, key){
      var r = func.call(scope, value, key);
      if(o.length) {
        ret.push(r);
      }
      else {
        ret[key] = r;
      }
    });
    return ret;
  }

  function some(o, func, scope) {
    if(typeof o.some === 'function') {
      return o.some(func, scope);
    }
    var ret = false;
    exhaust(o, function(value, key){
      if ((ret = func.call(scope, value, key))) {
        throw StopIteration;
      }
    });
    return ret;
  }
  
  function every(o, func, scope) {
    if(typeof o.every === 'function') {
      return o.every(func, scope);
    }
    var ret = true;
    exhaust(o, function(value, key){
      if (!(ret = func.call(scope, value, key))) {
        throw StopIteration;
      }
    });
    return ret;
  }
  
  function indexOf(o, val) {
    if(typeof o.indexOf === 'function') {
      return o.indexOf(val);
    }
    var ret = -1;
    exhaust(o, function(value, key){
      if (value === val) {
        ret = key;
        throw StopIteration;
      }
    });
    return ret;
  }
  
  function lastIndexOf(o, val){
    if(typeof o.lastIndexOf === 'function') {
      return o.lastIndexOf(val);
    }
    var ret = -1;
    exhaust(o, function(value, key){
      if (value === val) {
        ret = key;
      }
    });
    return ret;
  }

  function toArray(o){
    var ret = [];
    exhaust(o, function(v, k){
      ret.push(v);
    });
    return ret;
  }

  function reduce(ret, o, func, scope){
    exhaust(o, function(value, key){
      ret = func.call(scope, ret, value, key);
    });
    return ret;
  }
  
  function sum(o, ret) {
    return reduce(ret || 0, o, function(ret, a){
      return (ret + a);
    });
  }
  
  function pluck(o, key){
    return map(o, function(v){
      return v[key];
    });
  }

  function chain() {

    if(arguments.length === 1) {
      return iterator(arguments[0]);
    }

    var iterables = map(arguments, iterator);
    return {
      next: function() {
        try {
          return iterables[0].next();
        }
        catch(e) {
          if (e !== StopIteration) {
            throw e;
          }
          if(iterables.length === 1) {
            throw StopIteration;
          }
          iterables.shift();
          return iterables[0].next();
        }
      }
    };
  }

/*
  var data = {};
  this.attr = function(key, value) {
    if(arguments.length === 1) {
      return data[key][0];
    }
    else {
      data[key].unshift(value);
    }
  };
*/
  promise = {

    init: function() {
      
      this.deferreds = [];
      this.status = 0;
      return this;

    },

    then: function(callback, errback) {

      this.deferreds.push([callback, errback]);

      if(this.status === 1) {
        this.resolve();
      }
      
      return this;

    },

    resolve: function(res) {

      if (this.status === -1) {
        return;
      }
      this.status = 1;

      var d       = this.deferreds,
          result  = this.result;

      res = res || this.result;

      while (d.length > 0) {
        (function(){
          var f = d.shift()[res instanceof Error ? 1 : 0];
          if (typeof f === "function") {
            res = f(res) || result;
          }
        })();
      }
      this.result = res;

      return this;

    },

    cancel: function(){
      this.status = -1;
    }

  };

  function when() {

    var p, f, 
        i       = 0,
        l       = arguments.length, 
        args    = arguments,
        results = [];

    p = create(promise).init();

    f = function() {

      args[i++].then(function(data) {

        results.push(data);

        if(i < l) {
          f();
        }
        else {
          p.resolve(results);
        }
        return data;
      },
      function(e) {
        return e;
      });
    };

    f();

    return p;

  }


  /*

    Asyncronous data loading/posting and callback api

  */
   function processRequest(type, url, response, timeout, headers, repeat, data) {

    // create request
    var xhr = new XMLHttpRequest(), p, timer,
    
    // set headers
    defaultHeaders = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'text/javascript, text/html, application/xml, text/xml, application/json, application/javascript'
    };

    xhr.open(type, url, true);

    forEach(headers, function(header, i) {
      defaultHeaders[i] = header;
    });

    forEach(defaultHeaders, function(header, i) {
      xhr.setRequestHeader(i, header);
    });
    
    // instantiate deferred
    p = create(promise).init();
        
    // add handler
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        clearTimeout(timer);
        if (/(200|201|204|304)/.test(xhr.status)) {
          p.resolve(function(){
            switch (response) {
              case 'xml': return xhr.responseXML ? xhr.responseXML.documentElement : xhr.documentElement;
              case 'json': return json(xhr.responseText);
              default: return xhr.responseText;
            }
          }());
        }
        else {
          p.resolve(new Error(xhr.status));
        }
      }
    };

    // send request
    xhr.send(data || null);
    
    // push a repeater function onto the error stack if repeat is greater than 0;
    // otherwise chuck a timeout error
    timer = setTimeout(function() {
      xhr.abort();
      if(repeat > 0) {
        console.warn(repeat, ": ", url);
        getData(url, response, {
          timeout: timeout,
          headers: headers,
          repeat: repeat - 1,
          data: data
        }).then(function(data) {
          return p.resolve(data);
        },
        function() {
          return p.resolve(new Error(xhr.status));
        });
      }
      else {
        p.resolve(new Error("Timeout exceeded"));
      }
    }, timeout * 1000);
    
    return p;
  };
  

  // converts an object into a string "key1=value1&key2=value2" for posting
  function formatDataToString(data, doNotEncode) {

    if(typeof data !== 'string') {

      data = reduce([], data, function(i, value, key) {
        i[i.length] = key + "=" + value;
        return i; 
      }).join("&");

    }

    return doNotEncode ? data : encodeURIComponent(data);

  }


  function getData(url, response, options) {

    options = options || {};
    if (options.data) {
      url += (url.indexOf("?") !== -1 ? "&" : "?") + formatDataToString(options.data, true);
    }
    var p = processRequest('GET', url, response, options.timeout || 5, options.headers || {}, options.repeat || 0);
    p.then(options.success || false, options.error || false);
    return p;

  }

  // "x-www-form-urlencoded"
  function postData(url, response, options) {
    options = options || {};
    options.headers = options.headers || {};
    options.headers["Content-type"] = "application/" + response; 

    var p = processRequest('POST', url, response, options.timeout || 20, options.headers, options.repeat || 0, options.data ? formatDataToString(options.data, true) : "");
    p.then(options.success || false, options.error || false);
    return p;
  }

  function putData(url, response, options) {
    options = options || {};
    options.headers = options.headers || {};
    options.headers["Content-type"] = "application/" + response; 

    var p = processRequest('PUT', url, response, options.timeout || 20, options.headers, options.repeat || 0, options.data ? formatDataToString(options.data, true) : "");
    p.then(options.success || false, options.error || false);
    return p;
  }

  function deleteData(url, response, options) {

    options = options || {};
    var p = processRequest('DELETE', url, response, options.timeout || 5, options.headers || {}, options.repeat || 0);
    p.then(options.success || false, options.error || false);
    return p;

  }



  function createListener(obj, type, eventName, func) {

    if(!obj._listeners[type][eventName]) {
      obj._listeners[type][eventName] = [];
    }

    return {
      
      start: function() {
        obj._listeners[type][eventName].push(func);
        return this;
      },
    
      stop: function() {
        var index = obj._listeners[type][eventName].indexOf(func);
        if(index > -1) {
          obj._listeners[type][eventName].splice(index, 1);
        }
        return this;

      }
    
    };

  }

  events = {
    
    init: function() {
    
      this._listeners = {
        on: {},
        once: {}
      };
      return this;
    },

    fire: function(type, data) {
      
      return this._fire(create(event).init(type, data));

    }, 


    _fire: function(e) {

      var listener;

      //  move to a debug script that overrides this method
      if(typeof debug !== "undefined") {
        try {
          console.log(e.type, e.data || "");
        }
        catch(err) {}
      }


      if(typeof this._listeners.once[e.type] !== "undefined") {
        
        while(this._listeners.once[e.type].length > 0) {

          listener = this._listeners.once[e.type].shift();
          listener(e);
          if(e.propogationStopped) {
            return e;
          }
        }
        
      }

      //  broadcast message
      if(typeof this._listeners.on[e.type] !== "undefined") {
        
        some(this._listeners.on[e.type], function(listener){
          listener(e);
          return e.propogationStopped;
        });
      
      }

      return e;

    }

  };

  forEach(["on", "once"], function(method) {
    
    events[method] = function(eventName, func) {

      var listener = createListener(this, method, eventName, func);

      return listener.start();

    };

  });

  event = {

    init: function(type, data) {

      this.type = type;
      this.data = data || {};
      this.propogationStopped = false;
      this.defaultPrevented = false;
      return this;

    },

    stopPropogation: function() {

      this.propogationStopped = true;

    },

    preventDefault: function() {

      this.propogationStopped = true;
      this.defaultPrevented = true;

    }
  };

  socket = create(events, {
    
    init: function(uri) {

      var socket,
          that = this;

      this.callProto("init");

      this.on("send.message", function(e) {
        socket.send(that._format("j", JSON.stringify(e.data)));
      });

      this.on("close.socket", function() {
        socket.close();
      });

      try {
        
        socket = new WebSocket(uri);

        socket.onopen = function() {
          that.fire("socket.connected");
        };

        socket.onmessage = function(msg) {

          var data;
          if(/~j~/.test(msg.data)) {
            data = JSON.parse(msg.data.split("~j~")[1]);
            that.fire(data.type, data.data);
          }

          if(/~h~/.test(msg.data)) {
              socket.send(that._format("h", msg.data.split("~h~")[1]));
          }

          /*switch (true) {

            case (/~j~/.test(msg.data)):
              data = JSON.parse(msg.data.split("~j~")[1]);
              that.fire(data.type, data.data);
              break;           

            case (/~h~/.test(msg.data)):
              socket.send(that._format("h", msg.data.split("~h~")[1]));
              break;
          }*/

        };   

        socket.onclose = function(e) {
          that.fire("socket.closed");
        };

        socket.onerror = function(e) {
          console.log(e);
        };
      
      }
      catch(e) {
        console.log(e);
      }
      
      return this;      

    },

    fire: function(type, data) {
      this.callProto("fire", ["send.message", {
        type: type,
        data: data
      }]);
    },

    close: function() {
      this.callProto("fire", ["close.socket"]);
    }

  });

  /*
  socket = function() {

    var format = function(key, data) {
      key = "~" + key + "~";
      return "~m~" + (key + data).length + "~m~" + key + data;
    };
    
    return function(uri) {

      var id, em, init, socket;

      id = new Date().getTime();

      em = create(events).init();
      em.on("send.message", function(data) {
        socket.send(format("j", JSON.stringify(data)));
        //socket.send("~m~" + ("~j~" + JSON.stringify(data)).length + "~m~~j~" + JSON.stringify(data));
      });

      try {
        socket = new WebSocket(uri);

        socket.onopen = function() {
          em.fire("socket.connected", {
            id: id
          });
        };

        socket.onmessage = function(msg) {

          var data;
          switch (true) {

            case /~j~/.test(msg.data):
              data = JSON.parse(msg.data.split("~j~")[1]);
              em.fire(data.type, data.data);
              break;           

            case /~h~/.test(msg.data):
              socket.send(format("h", msg.data.split("~h~")[1]));
              //socket.send("~m~" + ("~h~" + msg.data.split("~h~")[1]).length + "~m~~h~" + msg.data.split("~h~")[1]);
              break;
          }
        };   

        socket.onclose = function(e) {
          em.fire("socket.closed", {
            id: id
          });
        };

        socket.onerror = function(e) {
          console.log(e);
        };
      }
      catch(e) {
        console.log(e);
      }
    
      return {
      
        on: function(type, func) {
          return em.on(type, func);
        },

        fire: function(type, data) {
          em.fire("send.message", {
            type: type,
            id: id,
            data: data
          });
        },

        close: function() {
          socket.close();
        }

      };
    }

  }();

  */

  /*

    Functions that call or bind existing functions
  
  */
  function bind(){
    var func = arguments[0], o = arguments[1], args = [], i, l;
    for(i = 1, l = arguments.length; i < l; i++) {
      args[i] = arguments[i];
    }
    return function(){
      return func.apply(o, args);
    };
  }
  
  function partial(){
    var func = arguments[0], args = Array.prototype.slice.call(arguments, 1);
    return function(){
      var i, l = args.length, j = 0, len = arguments.length;
      for(i = 0; i < l && j < len; i++ ) {
        if (typeof args[i] === 'undefined') {
          args[i] = arguments[j++];
        }
      }
      return func.apply(false, args);
    };
  }


  /*
  
    String processing functions
  
  */
  camelCase = (function() {
    var reCamelCase = /(-([a-z]))/g;
    return function(str){
      return str.replace(reCamelCase, function(str, p1, p2){
        return p2.toUpperCase();
      });
    };
  }());
  
  hyphenate = (function() {
    var reHyphenate = /([A-Z])/g;
    return function(str){
      return str.replace(reHyphenate, function(str, p1){
        return "-" + p1.toLowerCase();
      });
    };
  }());
  
  capitalise = (function() {
    var reCapitalise = /^([a-zA-Z])([a-zA-Z]+)/;
    return function(str){
      return str.replace(reCapitalise, function(str, p1, p2) {
        return p1.toUpperCase() + p2.toLowerCase();
      });
    };
  }());
  
  interpolate = (function() {
    var reInterpolate = /{([^{}]*)}/g;
    return function(str, data) {
      return str.replace(reInterpolate, function (str, p1) {
        var value = data[p1];
        return typeof value === 'string' || typeof value === 'number' ? value : p1;
      });
    };
  }());
  

  (function() {

    var em, workers;

    workers = [];
    em = create(events).init();    

    sys = {

      // post message to all listeners
      fire: function(type, data) {

        // broadcast message to listeners in this worker
        var e = em.fire(type, data);

        // broadcast message to workers
        forEach(workers, function(worker) {
          worker.postMessage({
            type: type,
            data: data
          });
        });
        
        return e;
            
      },

      // register listeners
      on: function(eventName, listener) {

        return em.on(eventName, listener);

      },

      // register listeners
      once: function(eventName, listener) {

        return em.once(eventName, listener);

      },


      // register worker
      addWorker: function(worker) {

        // receive message from data thread
        worker.onmessage = function(e) {
        
          // broadcast message to listeners in this thread
          sys.receive(e.data);

        };

        // define the onerror receiver
        worker.onerror = function(e) { 

          sys.receive({
            type: "worker.error",
            data: {
              message: e.message,
              filename: e.filename,
              lineno: e.lineno
            }
          });
        };

        workers.push(worker);

      },

      // receive message from worker
      receive: function(e) {
        
        // broadcast message to listeners in this thread
        em.fire(e.type, e.data);

      },

      loadCommand: function(cmdName) {
        
        var cmd = require("/app/commands/" + cmdName) || require("/lib/commands/" + cmdName);
        if(typeof cmd === "undefined") {
          throw new Error("cmd: " + cmdName + " does not exist");
        }
        return cmd;

      }

    };
    
  }());

  // register firebug console logging with message dispatcher
  // should force logging to propogate up workers
  forEach(["log", "warn", "error"], function(method) {
    
    sys.on("console_" + method, function(e) {
      
      console[method].apply(console, e.data.args);
    
    });
    
  });

  /*
  
    Module & dependency loading mechanism.
    http://wiki.commonjs.org/wiki/Modules/1.1
  
  */
  (function() {

    var loading = {},
        uninitialised = {},
        modules = {},
        load,
        head;

    // require a module
    function require(moduleName) {
      return modules[moduleName].def;
    }


    if(typeof importScripts === "function") { 
      load = function(moduleName) {
        
        if(modules[moduleName]) {
          return require(moduleName);
        }
        if(!self.debug) {
          moduleName += ".min";
        }
        importScripts(moduleName + ".js");
      };
    }
    else {
      head = document.getElementsByTagName("head")[0];
      // load a module from the server
      load = function(moduleName) {
        if(modules[moduleName]) {
          return require(moduleName);
        }
        loading[moduleName] = true;
        var script = document.createElement("script");
        script.id = moduleName;
        if(!self.debug) {
          moduleName += ".min";
        }
        script.src = moduleName + ".js";    
        head.appendChild(script);
    
      };
    }

    // load a template from the server
    function loadText(fileName) {

      loading[fileName] = true;
      getData(fileName, 'txt', {
        headers: { 
          'Cache-Control': 'no-cache, must-revalidate, no-store',
          'Pragma': 'no-cache'
        }
      }).then(function(data) {
          
        register(fileName, data);
        delete loading[fileName];
        forEach(uninitialised, function(module, moduleName) {
          define(moduleName, module.dependencies, module.def);
        });
      });

    }

    // initialise a module
    function define(moduleName, dependencies, def) {

      var exports, module;

      try {

        delete loading[moduleName];

        if(arguments.length === 2) {
          def = dependencies;
          dependencies = [];
        }

        // test to see if all the modules dependencies are loaded
        dependencies = filter(dependencies, function(module) {

          if(!modules[module]) {
            if(loading[module]) {
              return true;
            }
            else if(uninitialised[module]) {
              return true;
            }
            else {
              if(/\.\w{2,3}$/.test(module)) {
                loadText(module);
              }
              else {
                load(module);
              }
              return true;
            }
          }
          return false;
        });

        // if there are no unloaded dependencies, initialise the module, clean up and initialise all uninitialised modules
        if(dependencies.length === 0) {
          console.log("no deps: " + moduleName);
          
          exports = {};
          module = {path: moduleName};

          def(require, exports, module);

          register(moduleName, exports, module);

          delete uninitialised[moduleName];          
          forEach(uninitialised, function(module, moduleName) {

            define(moduleName, module.dependencies, module.def);

          });

          sys.fire("module.initialised", {
            moduleName: moduleName
          });
          
        }
        // add the module to the uninitialised stack
        else {
          
          uninitialised[moduleName] = {
            dependencies: dependencies,
            def: def
          };
          console.log("count: ", self.require.getUnin().length);
        }

      }
      catch(e) {
        console.log(moduleName);
      }
    }

    function getUnin() {
      return reduce([], uninitialised, function(ret, module, name){
            ret.push(name);
            return ret;
          });
    }

    //  register a module
    function register(moduleName, def, module) {
      module = module || {};
      module.id = module.id || moduleName;
      
      modules[moduleName] = {
        module: module, 
        def: def
      };
    }

    // attach api
    self.require = load;
    self.define = define;
    self.require.get = require;
    self.require.getUnin = getUnin;
    self.require.inspect = function(module) {    
      console.dir(module ? modules[module] : modules);
    };

  })();

  // spawn a new worker to load a specific module.
  // register the worker with the event dispatcher/
  // returns a deferred object which is fired when the thread is loaded
  function spawn(module, callback, errorback) {

    var p, initialModuleListener, guid, worker;
    
    if(Worker) {

      // create a callback holder
      p = create(promise).init();
      p.then(callback || false, errorback || false);

      //  create a new worker and register it's onmessage function
      worker = new Worker("/worker.js");
      worker.onmessage = function(e) {
        guid = e.data.guid;
        this.postMessage({
          type: "load.initial.module",
          module: module
        });
        sys.addWorker(worker);
      };
    
      // listen for the initial module event. fire callbacks waiting for the worker to initialise
      initialModuleListener = sys.on("initial.module.loaded", function(e) {

        if(e.data.guid === guid) {
          initialModuleListener.stop();
          initialModuleListener = null;
          p.resolve(module);
        }

      });
    
      return p;
    }
    else {
      return load(module, callback, errorback);
    }

  }
  
  
  // initialise a module within the current thread
  // returns a deferred object which is fired when the module is loaded 
  function load(module, callback, errorback) {
    
    var p, moduleLoadedListener;
    
    // create a callback holder
    p = create(promise).init();
    p.then(callback || false, errorback || false);

    moduleLoadedListener = sys.on("module.initialised", function(e) {
      if(e.data.moduleName === module) {
        moduleLoadedListener.stop();
        moduleLoadedListener = null;        
        p.resolve(module);
      }
    });

    require(module);
    
    return p;
  
  }
  

  // register system api's and language extensions
  define("sys", function(require, exports) {
    exports.fire        = sys.fire;
    exports.on          = sys.on;
    exports.once        = sys.once;
    exports.loadCommand = sys.loadCommand;
    exports._fire       = sys._fire;
  });
  define("object", function(require, exports) {
    exports.create  = create;
    exports.extend  = extend;
    exports.mixin   = mixin;
  }); 
  define("iter", function(require, exports) {
    exports.forEach     = forEach; 
    exports.filter      = filter;
    exports.map         = map;
    exports.some        = some;
    exports.every       = every;
    exports.indexOf     = indexOf;
    exports.lastIndexOf = lastIndexOf;
    exports.toArray     = toArray;
    exports.reduce      = reduce;
    exports.sum         = sum;
    exports.pluck       = pluck;
    exports.chain       = chain;
    exports.iterator    = iterator;
  });
  define("events", function(require, exports) {
    exports.proto   = events;
    exports.event   = event;
  });
  define("async", function(require, exports) {
    exports.promise = promise;
    exports.when    = when;
  });
  define("net", function(require, exports) {
    exports.get     = getData;
    exports.post    = postData;
    exports.put     = putData;
    exports.del     = deleteData;
    exports.socket  = socket;
  });
  define("func", function(require, exports) {
    exports.bind    = bind;
    exports.partial = partial;
  });
  define("string", function(require, exports) {
    //exports.trim        = trim;
    exports.camelCase   = camelCase;
    exports.hyphenate   = hyphenate;
    exports.capitalise  = capitalise;
    exports.interpolate = interpolate;
  });
  define("module", function(require, exports) {
    exports.spawn = spawn;
    exports.load  = load;
  });

})(function(string) {
    try {  
      return eval("(" + string + ")");
    }
    catch(e) {
      console.error(e.message);
      return false;
    }
  }
);

