/*
	@name: 			  appFactory

	@description:	creates a client or core system app

	@author:		  Simon Jefford
	
*/

exports.create = function(appDefinition) {


  //  this is where would apply some logic to load a client specific app if one existed
  //  other wise we'd load the core system one

  try {
    
    return {
      render: function() {
         appDefinition.container.append(appDefinition.appType.uuid_name); 
      }
    };

  }
  catch(e) {
    
    console.error("GlobalDawn." + appName + ": Error loading app", e);
    
  }
  
};
