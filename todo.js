
build

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



application

	ui state: map events to levels.
	components
	data binding
	vagrant the server


layouts listen
/state/change
	section layouts match 
	forward


section layouts then forward && apps listen to
/state/data-list/:data-template-id/update
/state/data-record/:data-template-id/update
/state/user-list/:data-template-id/update
/state/user-record/:data-template-id/update



apps fire
/app/update -> fires update on all child components


apps get bound to template ids -> when they mathch - pass the model to components
components get bound to keys
	model[key]().value()


navigation elements publish events
corresponding section elements subscribe to those events









