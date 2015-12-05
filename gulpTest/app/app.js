var $ = require('jquery'),
	Backbone = require('backbone'),
	//Controller = require('./controllers/app.controller'),
	BookListView = require('./views/app.book-list.view'),
	PanierListView = require('./views/app.panier-list.view'),
	PrixPanierView = require('./views/app.prix-panier.view');


$(function() {
	// if (window.__backboneAgent) {
	// 	window.__backboneAgent.handleBackbone(Backbone);
	// }

	// Controller.init();

	//INSTANTIATE VIEWS
	bookListView = new BookListView();
	prixPanierView = new PrixPanierView();
	panierListView = new PanierListView();
	
});