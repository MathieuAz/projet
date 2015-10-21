var Backbone = require('backbone'),
	_ = require('underscore'),
	BooksList = require('../collections/app.book.collection'),
	BookItemView = require('./app.book-item.view');


var BookListView = Backbone.View.extend({
	el: '#list',
	collection: new BooksList(),

	initialize: function() {
		_.bindAll(this, 'render', 'processBook');
		this.collection.fetch({
			success: this.render
		});
	},

	render: function() {
		_.each(this.collection.models, this.processBook, this);
		return this;
	},

	//Each book instanciate a new book's view
	processBook: function(book) {
		var childBookItemView = new BookItemView({
			model: book
		});
		childBookItemView.render();
		this.$el.append(childBookItemView.el);
	}
});

module.exports = BookListView;