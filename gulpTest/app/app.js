var $ = require('jquery'),
	PubSub = require('./pubsub'),
	AppController = require('./controllers/app.controller'),
	BookListView = require('./views/app.book-list.view'),
	PanierListView = require('./views/app.panier-list.view'),
	PrixPanierView = require('./views/app.prix-panier.view');


(function(window, $, undefined) {
	pubSub = new PubSub();

	AppController.init();
	
	//INSTANTIATE VIEWS
	var bookListView = new BookListView();
	var panierListView = new PanierListView();
	var prixListView = new PrixPanierView();
})(window, $);