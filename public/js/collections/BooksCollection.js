define([
	'jquery',
	'underscore',
    'backbone',
    'models/BookModel'
	],function($, _, Backbone,libroModel){
	  	var Books = Backbone.Collection.extend({
      		//url: 'server/index.php/books'
      		model: libroModel,
      		url: '../server/index.php/books'
      	});
		return Books;
	});

