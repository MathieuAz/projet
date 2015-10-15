var Backbone = require('backbone');


var Book = Backbone.Model.extend({
    defaults: {'quantite': 1}
});

module.exports = Book;