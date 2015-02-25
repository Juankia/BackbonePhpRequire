define([	
	'jquery',
	'underscore',
	'backbone'
	],function($,_,Backbone){
	var Book = Backbone.Model.extend({
    	urlRoot: '../server/index.php/books'
    });
	return Book;
})

	
 