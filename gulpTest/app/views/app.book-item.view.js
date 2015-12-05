var Backbone = require('backbone'),
	_ = require('underscore'),
	bookTemplate = require('./templates/book-template.hbs'),
	pubSub = require('../pubsub');


var BookItemView = Backbone.View.extend({
	template: bookTemplate,
	tagName: 'li',

	initialize: function() {
		_.bindAll(this, 'render', 'publish');
	},

	events: {
		'click p, img': 'publish'
	},

	render: function() {
		var html = this.template(this.model.toJSON());
		this.$el.html(html);
	},

	publish: function() {
		pubSub.events.trigger('book:clicked', this.model);
		//app.panierListView.addBook(this.model);
	}
});

module.exports = BookItemView;