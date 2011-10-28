/*
	@name: 			  page

	@description:	page object 

	@author:		  Simon Jefford
	
*/

var events     = require("events"),
    object 	   = require("object"),
    appFactory = require("/lib/core/appFactory"),
    //$ 	       = req uire("/lib/3rd_party/sly").jQuery,
    _          = require("iter");


exports.init = function(def) {

  this.uuid     = def.uuid;
  this.name     = def.name;
  this.layout = $("<div>" + def.html_fragment + "</div>");
  this.pageType = def.page_type;

  this.rootNodes = {
    header: $("#system-header"),
    body: $("#system-body"),
    footer: $("#system-footer")
  }

  this.nodes = {
    header: this.layout.find("header"),
    footer: this.layout.find("footer"),
    body:   this.layout.find("section")
  }
  
  this.registeredApps = {
    header: [],
    footer: [],
    body:   []
  };
  
  //  create this pages event custom event instance
  this.events = object.create(events).init();;

  return this;

};

exports.renderHeader = function() {

  this._render("header");

};

exports.renderBody = function() {

  this.nodes.body.attr("data-page-name", this.name);
  this._render("body");
  this.isInitialised = true;

};

exports.renderFooter = function() {

  this._render("footer");

};

exports.showBody = function() {

  this.nodes.body.show();

};

exports.hideBody = function() {

  this.nodes.body.hide();

};

exports.loadZones = function(zones) {
  
  this.zones = zones;
  
};

exports.loadApps = function(apps) {
  
  this.apps = apps;
  
};

exports._render = function(component) {

  this.rootNodes[component].append(this._bindAppsToZones(component));
  _.forEach(this.registeredApps[component], function(app){
    app.render();
  });

};




//  todo: move some functionality into seperate classes for app groups and zones.
//        where each zone/app group contains a list of all the possible apps it is configured with.
//        also move the eval can_render_fn out to the point of rendering a zone once some API entry data is
//        returned by the new Data layer.
exports._bindAppsToZones = function(component) {

  var zones = this.zones, apps = this.apps, events = this.events, registeredApps = this.registeredApps;

  function sortUuidsByOrder(ret, data) {
    ret[data.order] = data.uuid;
    return ret;
  }

  function mapConfiguration(ret, data) {
    ret[data.name] = data.value;
    return ret;
  }
  
  _.forEach(this.nodes[component].find("div[data-zone-uuid]"), function(zoneContainer) {
    
    zoneContainer = $(zoneContainer);
    
    var zone = zones[zoneContainer.attr("data-zone-uuid")];
    
    if(zone && zone.app_groups) {

      //  loop through all the app groups - sorted by their order key
      _.forEach(_.reduce(zone.app_groups, sortUuidsByOrder, []), function(appGroupUuid) {

        var appGroup = zone.app_groups[appGroupUuid];

        if(appGroup.apps) {

          //  loop through each app groups apps - sorted by their order key
          _.forEach(_.reduce(appGroup.apps, sortUuidsByOrder, []), function(appUuid) {

            var appType, appData, container, appTypeConfiguration, appConfiguration, configuration;

            if (!appUuid) return false;
            app = appGroup.apps[appUuid];
            // Get the app type for this app.
            appType = apps[app.app_type_uuid];
            
            // Create an eval function for us to test with.
            eval('var canRenderTest = ' + appType.can_render_fn + ';');
            
            appData = {};
            
            // Check the result of the can render function and pick to render if possible.
            if(canRenderTest(appData)) {
              // Create the container that this app will sit in.
              container = $('<div></div>').attr({
                id: app.uuid,
                'data-app-type': appType.uuid_name
              });
              
              appTypeConfiguration = _.reduce(appType.configuration, mapConfiguration, {});
              appConfiguration = _.reduce(app.configuration, mapConfiguration, {});

              configuration = $.extend(true, {}, appTypeConfiguration, appConfiguration);
              
              //  here we now want to initialise the apps. it would be really cool if they are alreay loaded
              //  via requirejs...
              registeredApps[component].push(appFactory.create({
                app: app,
                appType: appType,
                layeredAppGroup: appGroup,
                zone: zone,
                container: container,
                configuration: configuration,
                pageEvents: events
              }));

              // Append this container for the app to the DOM fragment we are working with.
              zoneContainer.append(container);
              
            }
          });
        }
      });

    }
    
  });

  return this.nodes[component];
  
};
