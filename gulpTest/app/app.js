var $ = require('jquery'),
	Backbone = require('backbone'),
	PubSub = require('./pubsub'),
	Controller = require('./controllers/app.controller'),
	BookListView = require('./views/app.book-list.view'),
	PanierListView = require('./views/app.panier-list.view'),
	PrixPanierView = require('./views/app.prix-panier.view');


$(function() {
	if (window.__backboneAgent) {
		window.__backboneAgent.handleBackbone(Backbone);
	}

	window.app = {};

	app.pubSub = new PubSub();

	app.controller = new Controller.init();

	//INSTANTIATE VIEWS
	app.bookListView = new BookListView();
	app.prixPanierView = new PrixPanierView();
	app.panierListView = new PanierListView();

});