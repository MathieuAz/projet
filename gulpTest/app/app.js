var $ = require('jquery'),
	PubSub = require('./pubsub'),
	Controller = require('./controllers/app.controller'),
	BookListView = require('./views/app.book-list.view'),
	PanierListView = require('./views/app.panier-list.view'),
	PrixPanierView = require('./views/app.prix-panier.view');


(function(window, $, undefined) {

	window.app = {};

	app.pubSub = new PubSub();

	app.controller = new Controller.init();
	
	//INSTANTIATE VIEWS
	app.bookListView = new BookListView();
	app.panierListView = new PanierListView();
	app.prixPanierView = new PrixPanierView();

})(window, $);