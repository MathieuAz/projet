var Backbone = require('backbone'),
	_ = require('underscore');


var PubSub = function() {
    this.events = _.extend({}, Backbone.Events);
};

var pubSub = new PubSub();

module.exports = pubSub;