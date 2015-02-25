define([
  'jquery',
  'underscore',
  'backboneMaster',
  'collections/BooksCollection'
],function($, _, Backbone, Books){
	var BooksList = Backbone.View.extend({
		el: '#content',
		getTitle: function () {
	        return "PHP BACKBONE REQUIRE REST FULL ";
	    },
	    initialize: function(){	    		    	
				var that =this;
				var books = new Books();					
				books.fetch({
					success: function(books){						
						var template = _.template($('#book-list-template').html(), {books: books.models});
						that.$el.html(template);
					} 
				});				
	    }
	});
	return BooksList;
});


