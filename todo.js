
vagrant up the server


build scripts

	app

		copy and minify: require.js, worker.js, es5-shim.js
		copy: index.html, index.debug.html
		build, minify and concatenate: app/main.js
		build and copy: all test files

	file

		build and copy file
			just copy in the case of txt files



create
	
	component: js, template, css, img
	app: js, template, css, img
	layout: js, template, css, img
	model
	command
	sequence
	module


//	site model

loads site tree and site model data as one?


//	system initialisation events

/system/app/loaded
/system/ui/initialised
/system/data/loaded

//  upon app instantiaton, if it has record bindings, fire an event to get that data
//  collect all the get data events and push them into a when() and fire
//  /system/data/loaded event upon completion




//	state events
/state/change/requested
/state/update/requested
/state/updated

	apps listen on() to from ui.fire
	/state/data-list/:data-template-uuid/updated
	/state/data-record/:data-template-uuid/updated
	/state/user-list/:data-template-uuid/updated
	/state/user-record/:data-template-uuid/updated

	apps listen once() to sys.fire
	/bind/data-record/:data-instance-uuid
	/bind/user-record/:data-instance-id


apps fire
/app/updated -> fires update on all child components


apps get bound to template ids -> when they mathch - pass the model to components
components get bound to keys
	model[key]().value()


navigation elements publish events
corresponding section elements subscribe to those events














