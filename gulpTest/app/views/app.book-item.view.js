var Backbone = require('backbone'),
    _ = require('underscore'),
    bookTemplate = require('./templates/book-template.hbs');


//var app = app || {};

var Models = (function() {
    var Models = {};

    Models.BookItemView = Backbone.View.extend({
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

    return Models;
})();

module.exports = Models.BookItemView;