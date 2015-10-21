var Backbone = require('backbone'),
	_ = require('underscore'),
	panierTemplate = require('./templates/panier-template.hbs'),
	PanierList = require('../collections/app.panier.collection');


var PanierListView = Backbone.View.extend({
    el: '#panier',
    template: panierTemplate,
    collection: new PanierList(),
    events: {
        'click #vider-panier': 'cleanPanier'
    },
    
    initialize: function() {
        _.bindAll(this, 'render', 'renderBook', 'addBook', 'cleanPanier');
        //app.pubSub.events.on('book:clicked', this.addBook, this);
    },
    
    render: function() {
        this.$el.find('#books-selected').empty();

        _.each(this.collection.models, this.renderBook, this);

        //app.pubSub.events.trigger('book:add', this.collection);
        app.prixPanierView.processPrix(this.collection);
    },
     
    renderBook: function(book) {
        var html = this.template(book.toJSON());
        this.$el.find('#books-selected').append(html);
    },
    
    //If it doesn't exist, add selected book in PanierList collection, else increment its quantite
    addBook: function(book) {
        var modelExist = _.findWhere(this.collection.models, {cid: book.cid});

        if (modelExist) {
            modelExist.set('quantite', modelExist.get('quantite') + 1);
        } else {
            this.collection.add(book);
        }
        
        this.render();
    },

    cleanPanier: function() {
        //Reset quantity of book
        _.each(this.collection.models, function(model) {
            model.set('quantite', 1);
        });

        //Remove books in panier
        this.collection.remove(this.collection.models);
        
        this.$el.find('#books-selected, #prix-reduction').empty();
        this.$el.find('#prix-total').html('0');
    }
});

module.exports = PanierListView;