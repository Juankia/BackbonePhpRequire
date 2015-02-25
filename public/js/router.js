define([
	'jquery',
    'underscore',
    'backbone',
    'backboneParams',
    ], function($, _, Backbone, backboneParams){

	var Router = Backbone.Router.extend({
			routes: {				
				"/":"root",
				"":"root",
				"new":"editBook",
				"edit/:id":"editBook",
				"search/:name":"findbyName"
			}
		});

		var initialize = function(){			

			router = new Router;	
			router.on('route:root', function(){
				console.log('ENTRO EN HOME.fff...............');
				require(['views/BooksList'], 
				function(bookslist){
					console.log('ENTRO EN HOME................');
					Bookslist= new bookslist();
					//bookslist.render();
/*					$(document).attr('title', bookslist.getTitle);
					console.log('We have loaded the page ');*/
				});				
			});
			router.on('route:editBook', function(id){				
				console.log('called edit');
				/*editBook.render({id:id});			
				$(document).attr('title', editBook.getTitle({id:id}));*/
			});
					
			router.on('route:findbyName' , function(name) {
				console.log('called edit');
				/*searchList.render({name:name});
				$(document).attr('title', searchList.getTitle({name:name}));*/
			});				
 	     
		};			
		return {
			initialize: initialize
		};		
});
