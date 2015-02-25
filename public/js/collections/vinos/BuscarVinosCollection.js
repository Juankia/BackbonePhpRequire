define([
	'jquery',
	'underscore',
    'backbone',
    'models/BookModel'
	],function($, _, Backbone,libroModel){
		console.log('Vinos Collection CALLED----> ');
		var BuscarVinos = Backbone.Collection.extend({
			url:'../server/index.php/books/buscarVinos'
		});
	return BuscarVinos;
});