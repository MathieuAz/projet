var expect = require('chai').expect;
var sinon = require('sinon');
var bookList = require('../app/collections/app.book.collection');

describe('App Henri Potier', function() {
	describe('Collection de livres', function() {
		beforeEach(function() {
			this.server = sinon.fakeServer.create();
			this.collection = new bookList();
		});

		afterEach(function() {
			this.server.restore();
		});

		it('should default "url" property to "http://henri-potier.xebia.fr/books"', function() {
			expect(this.collection.url).to.equal('http://henri-potier.xebia.fr/books');
		});

		it("should make the correct request", function() {
			this.collection.fetch();
			//expect(this.server.requests.length).toEqual(1);
			// expect(this.server.requests[0].method).to.equal("GET");
			expect(this.server.requests[0].url).toEqual("http://henri-potier.xebia.fr/books");
		});
	});
});