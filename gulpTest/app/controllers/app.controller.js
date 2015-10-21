var _ = require('underscore');

var Controller = (function() {
	var controller = {};

	// var display = _.bind(function() {

	//     this.layout = new this.Views.mesAlertes();

	//     this.alertesModel = new this.Models.mesAlertesModel();

	// }, mesAlertes);

	// var success = _.bind(function() {
	//     this.layout.model.set('alerteCree', true, {
	//         silent: true
	//     });
	//     this.layout.render();
	//     if (KV.storage.isAvailable()) {
	//         KV.storage.setItem('AV-preventInit', true);
	//     }
	// }, mesAlertes);

	var registerEvents = _.bind(function() {
		// app.mediator.subscribe("maSelection: Views.maSelection: displayMaSelection", display);
		// app.mediator.subscribe("mesAlertes: Views.mesAlertes: Success", success);
	}, controller);

	/**
	 * [init mesAlertes]
	 */
	controller.init = function() {
		console.log("[Controller:init] initialisation de l'appli Henri Potier");
		registerEvents();
	};

	return controller;
})();

module.exports = Controller;