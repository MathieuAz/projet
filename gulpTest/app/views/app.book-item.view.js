var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
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
        return this;
    },

    publish: function() {
        pubSub.events.trigger('book:clicked', this.model);
    }
});

module.exports = BookItemView;