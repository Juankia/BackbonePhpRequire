define([
	'jquery'
	,'underscore'
    ,'backboneMaster'
    ,'collections/Books2'
	],function($, _, Backbone, Books2){
	var SearchListView = Backbone.View.extend({
		getTitle: function (options) {
			if(options.name)
				return "Search book";
		},
		el: '#content',	
		initialize: function(){

		}
		,
		render: function (options) {
			console.log('SearchListView CALLED-----> ');
			var that =this;
			var books = new Books2();
			books.fetch({
				data : {name: options.name
				},
				success: function(books){
					var template = _.template($('#book-list-template').html(), {books:books.models});
					that.$el.html(template);
					
				}
				
			
			});		
		}
    });
	return SearchListView;
  });