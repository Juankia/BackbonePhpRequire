define([
	'jquery'
	,'underscore'
    ,'backboneMaster'
    ,'collections/vinos/BuscarVinosCollection'
	],function($, _, Backbone, Vinos){
	var SearchListVinoView = Backbone.View.extend({
		getTitle: function (options) {
			if(options.name)
				return "Search vino";
		},
		el: '.content',	
		initialize: function(){

		}
		,
		render: function (options) {

	      $el.isotope({
	        itemSelector : '.element'
	      });

		////
		 $el.infinitescroll({
        navSelector  : '#page_nav',    // selector for the paged navigation 
        nextSelector : '#page_nav a',  // selector for the NEXT link (to page 2)
        itemSelector : '.element',     // selector for all items you'll retrieve
        loading: {
            finishedMsg: 'No more pages to load.',
            img: 'http://i.imgur.com/qkKy8.gif'
          }
        },
        // call Isotope as a callback
        function( newElements ) {
          $el.isotope( 'appended', $( newElements ) ); 
        }
      );
      

	    ///
			console.log('SearchListVinoView CALLED-----> ');
			var that =this;
			var vinos = new Vinos();
			vinos.fetch({
				data : {name: options.name
				},
				success: function(vinos){
					var template = _.template($('#content').html(), {vinos:vinos.models});
					that.$el.html(template);
				}
			});		
		}
    });
	return SearchListVinoView;
  });