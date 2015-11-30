var Backbone = require('backbone'),
	BackboneLocalStorage = require('backbone.localstorage'),
	Book = require('../models/app.model.js');


var PanierList = Backbone.Collection.extend({
	model: Book,
	localStorage: new BackboneLocalStorage('Books-List')
});

module.exports = PanierList;