var Backbone = require('backbone'),
	_ = require('underscore'),
	prixTemplate = require('./templates/prix-template.hbs'),
	PanierPrix = require('../collections/app.prix.collection'),
	pubSub = require('../pubsub');


var PrixPanierView = Backbone.View.extend({
	el: '#prix-panier',
	template: prixTemplate,
	collection: new PanierPrix([{prixTotal: 0, prixReduction: 0}]),

	initialize: function() {
		_.bindAll(this, 'render', 'processPrix');
		pubSub.events.on('book:add', this.processPrix, this);
		this.render(0);
	},

	processPrix: function(collection) {
		var isbnArray = [],
				price = 0;

		if (collection.models.length > 0) {
			//Replace this collection (with fetch results) with PanierListView's collection
			this.collection.reset(collection.models);

			_.each(this.collection.models, function(model) {
				isbnArray.push(model.get('isbn'));
				price += model.get('price') * model.get('quantite');
			});

			this.collection.url = 'http://henri-potier.xebia.fr/books/' + isbnArray.toString() + '/commercialOffers';

			var that = this;
			this.collection.fetch().done(function() {
				that.render(price);
			});

			// this.collection.fetch({
			// 	success: this.render(price)
			// });
		} else {
			this.render(price);
		}
	},

	render: function(price) {
		var prixTotal = price,
			prixReduction,
			prixPercentage,
			prixMinus,
			prixSlice,
			prixArray = [];

		if (prixTotal !== 0) {
			var offers = this.collection.models[0].get('offers');

			if (offers) {
				//Recalcule le prix pour chaque promotion et le push dans un tableau
				_.each(offers, function(value) {
					switch (value.type) {
						case 'percentage':
							prixPercentage = +prixTotal - (+prixTotal * (value.value / 100));
							prixArray.push(prixPercentage);
							break;
						case 'minus':
							prixMinus = +prixTotal - value.value;
							prixArray.push(prixMinus);
							break;
						case 'slice':
							if (+prixTotal > value.sliceValue) {
								var division = +prixTotal / value.sliceValue;
								prixSlice = +prixTotal - (value.value * division);
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
				prixReduction = prixArraySort[0];
			}
		}
		
		this.collection.models[0].set('prixTotal', prixTotal);
		this.collection.models[0].set('prixReduction', prixReduction);

		var html = this.template(this.collection.models[0].toJSON());

		this.$el.html(html);
	}
});

module.exports = PrixPanierView;