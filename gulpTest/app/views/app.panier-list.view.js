var Backbone = require('backbone'),
	_ = require('underscore'),
	panierTemplate = require('./templates/panier-template.hbs'),
	PanierList = require('../collections/app.panier.collection'),
	pubSub = require('../pubsub');


var PanierListView = Backbone.View.extend({
	el: '#panier',
	template: panierTemplate,
	collection: new PanierList(),
	events: {
		'click #vider-panier': 'cleanPanier'
	},

	initialize: function() {
		_.bindAll(this, 'render', 'renderBook', 'addBook', 'cleanPanier');
		pubSub.events.on('book:clicked', this.addBook, this);
		var modelExist;

		this.collection.on('add', this.render, this);
		this.collection.on('change:quantite', this.render, this);

		this.collection.fetch();
		//this.render();
	},

	render: function() {
		this.renderBook(this.collection);

		pubSub.events.trigger('book:add', this.collection);
		//app.prixPanierView.processPrix(this.collection);
	},

	renderBook: function(books) {
		var html = this.template(books.toJSON());
		this.$el.find('#books-selected').html(html);
	},

	//If it doesn't exist, add selected book in PanierList collection, else increment its quantite
	addBook: function(bookSelected) {
		//var modelExist = _.findWhere(this.collection.models, {cid: bookSelected.cid});
		modelExist = false;

		_.each(this.collection.models, function(book) {
			if (book.get('title') === bookSelected.get('title')) {
				modelExist = true;
				book.set('quantite', book.get('quantite') + 1);
				book.save();
			}
		});

		if (!modelExist) {
			this.collection.create(bookSelected.toJSON());
		}
	},

	cleanPanier: function() {
		//Remove books in panier
		/* Invoke uses map under the hood, and destroy unstably removes the elements from the collection's models array
		as map is processing over them (it destroys every other model in the collection).
		As a workaround you can clone the models before calling destroy */
		_.invoke(_.clone(this.collection.models), 'destroy');

		this.render();
	}
});

module.exports = PanierListView;