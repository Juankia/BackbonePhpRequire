define([
	'jquery',
	'underscore',
    'backbone',
    'models/BookModel'
	],function($, _, Backbone,libroModel){
		console.log('Books2 Collection CALLED----> ');
		var Books2 = Backbone.Collection.extend({
			url:'../server/index.php/books/search'
		});
	return Books2;
});