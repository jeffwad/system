/*
	@name: 			site

	@description:	site definition, had details about the site, client?(maybe a client object) etc

	@author:		Simon Jefford
	
*/

var sys = require("sys"),
		env	=	require("env");//,
		///$ 	= req ui re("/lib/3rd_party/sly");



function setSiteDefinition(data) {

  data.merged_configuration = _.map(data.merged_configuration, function(v) {
    var r = {};
    r[v.name] = v.value;
    return r;
  });

  exports.currentSite = data;

  sys.fire("system.current.site.created", data);
}


exports.getCurrent = function() {

  var p = new $.Deferred();

  $.ajax({

    url : env.domain + '/api/current_site.json',

    success : function(response) {

      if (!response || !response.data || !response.data.merged_configuration) {
        throw new Error('Error loading configuration from current.json - "merged_configuration" is missing or malformed. Please check the output of current.json.');
      }

      setSiteDefinition(response.data);

      p.resolve();
    }

  });

  return p;
  
};

exports.getPageDefinition = function() {

  var that = this, p = new $.Deferred();

  $.ajax({

    url : env.domain + '/api/pages.all.json',

    dataType: 'json',

    success : function(response) {

      that.pages = response.data;
      p.resolve();

    }

  });
  
  return p;
  
};

