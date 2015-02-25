define([
	'jquery',
   	'backbone'
	],function($, Backbone) {
$.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
    };
    	require(['views/EditBookView'],function(editar){
			Editar= new editar();			
		});	

		require(['views/SearchListView'],function(SearchList){
			searchList = new SearchList();						
		});	

		require(['views/SearchBoxView'],function(SearchBoxView){
			searchBox = new SearchBoxView();						
		});		

		//VINOS
		require(['views/vinos/SearchBoxVinoView'],function(SearchBoxVinoView){
			searchBoxVino = new SearchBoxVinoView();						
		});	

		require(['views/vinos/SearchListVinoView'],function(SearchListVino){
			searchVinoList = new SearchListVino();						
		});	
//Router

	var Router = Backbone.Router.extend({
		routes: {
			'libros':'home',
			'new':'editBook',
			'edit/:id':'editBook',
			'search/:name' : 'findbyName',
			'searchVino/:name': 'buscarVinos',
			//Sección Vinos
			""                  : "home",
			"vinos"             : "listVinos",
			"wines/page/:page"	: "listVinos",
	        "wines/add"         : "addWine",
	        "wines/:id"         : "wineDetails",
	        "about"             : "about"
		}
	});
			
	router = new Router();

//Rutas que escuchan 
	router.on('route:home', function(){			
		require(['views/BooksListView'], function(bookslist){
		console.log('LIBROS CALLED---->');					
			Bookslist= new bookslist();		
			document.getElementById("searchText").setAttribute("placeholder","Buscar libros");		

		});	

	});
		
	router.on('route:editBook', function(id){
		Editar.render({id:id});
		console.log('called edit');
		$(document).attr('title', Editar.getTitle({id:id}));
	});
			
	router.on('route:findbyName' , function(name) {		
		console.log('SE ACABO FIND');		
		searchList.render({name:name});
		$(document).attr('title', searchList.getTitle({name:name}));			
	});
//Rutas que escuchan Vinos
	router.on('route:listVinos', function(page){			
		require(['views/vinos/WinelistView' ,'collections/vinosCollection' ,'text!templates/vinos/indexVinos.html'], function(WineListView, WineCollection, indexVinos){
			 var p = page ? parseInt(page, 10) : 1;
                var wineList = new WineCollection();
                wineList.fetch({success: function(){                    
                    $("#content").html(new WineListView({model: wineList, page: p}).el); 				
                document.getElementById("searchText").setAttribute("placeholder","Buscar vinos");		
             }});                
		});	
	});
	//
	router.on('route:buscarVinos' , function(name) {		
		console.log('BUSCAR VINOS  FIND');		
		searchVinoList.render({name:name});
		$(document).attr('title', searchVinoList.getTitle({name:name}));			
	});

	Backbone.history.start();		
});

