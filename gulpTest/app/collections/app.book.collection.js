var Backbone = require('backbone'),
	Book = require('../models/app.model');


var BooksList = Backbone.Collection.extend({
    model: Book,
    url: 'http://henri-potier.xebia.fr/books'
});

module.exports = BooksList;