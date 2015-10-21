var Backbone = require('backbone'),
    _ = require('underscore'),
    prixTemplate = require('./templates/prix-template.hbs'),
    PanierPrix = require('../collections/app.prix.collection');


var PrixPanierView = Backbone.View.extend({
    el: '#prix-panier',
    template: prixTemplate,
    collection: new PanierPrix(),

    initialize: function() {
        _.bindAll(this, 'render', 'processPrix');
        //app.pubSub.events.on('book:add', this.processPrix, this);
    },

    processPrix: function(collection) {
        //Replace this collection (with fetch results) with PanierListView's collection
        this.collection.reset(collection.models);

        var isbnArray = [],
            price = 0;

        _.each(this.collection.models, function(model) {
            isbnArray.push(model.get('isbn'));
            price += model.get('price') * model.get('quantite');
        });

        this.$el.find('#prix-total').html(price);

        this.collection.url = 'http://henri-potier.xebia.fr/books/'+ isbnArray.toString() +'/commercialOffers';
        
        this.collection.fetch({
            success: this.render
        });
    },

    render: function() {
        var offers = this.collection.models[0].get('offers');

        if (offers) {
            var prixTotal = this.$el.find('#prix-total').html(),
                prixPercentage,
                prixMinus,
                prixSlice,
                prixArray = [];

            //Recalcule le prix pour chaque promotion et le push dans un tableau
            _.each(offers, function(value) {
                switch(value.type) {
                    case 'percentage':
                        prixPercentage = prixTotal - (prixTotal * (value.value / 100));
                        prixArray.push(prixPercentage);
                        break;
                    case 'minus':
                        prixMinus = prixTotal - value.value;
                        prixArray.push(prixMinus);
                        break;
                    case 'slice':
                        if (prixTotal > value.sliceValue) {
                            var division = prixTotal / value.sliceValue;
                            prixSlice = prixTotal - (value.value * parseInt(division, 10));
                            prixArray.push(prixSlice);
                        }
                        break;
                }
            });

            //Sort array by price
            var prixArraySort = prixArray.sort(function(a, b) {
                return a - b;
            });

            //The cheapest price
            var prixReduction = prixArraySort[0];

            this.collection.models[0].set('prixTotal', prixTotal);
            this.collection.models[0].set('prixReduction', prixReduction);
        
            var html = this.template(this.collection.models[0].toJSON());

            this.$el.html(html);
        }
    }
});

module.exports = PrixPanierView;