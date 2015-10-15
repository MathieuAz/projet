var expect = require('chai').expect;
var Book = require('../app/models/app.model');

describe('App Henri Potier', function() {
	describe('Model', function() {
		it('should default "quantite" property to "1"', function() {
			var book = new Book();
			expect(book.get('quantite')).to.equal(1);
		});
	});
});