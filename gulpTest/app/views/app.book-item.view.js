var Backbone = require('backbone'),
	_ = require('underscore'),
	bookTemplate = require('./templates/book-template.hbs');


var BookItemView = Backbone.View.extend({
	template: bookTemplate,
	tagName: 'li',

	initialize: function() {
		_.bindAll(this, 'render', 'publish');
	},

	events: {
		'click p': 'publish'
	},

	render: function() {
		var html = this.template(this.model.toJSON());
		this.$el.html(html);
	},

	publish: function() {
		//app.pubSub.events.trigger('book:clicked', this.model);
		app.panierListView.addBook(this.model);
	}
});

module.exports = BookItemView;