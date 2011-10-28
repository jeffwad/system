/*
	@name: 			env

	@description:	environment set up

	@author:		Simon Jefford
	
*/

exports.domain = (location.host == 'localhost.test' || location.protocol == 'file:' ? 'http://localhost' : '');
