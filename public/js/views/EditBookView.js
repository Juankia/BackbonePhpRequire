define([
  'jquery',
  'underscore',
  'backboneMaster',
  'models/BookModel',
  'collections/BooksCollection'
	],function($, _, Backbone, Book, Libros){
	var EditBook = Backbone.View.extend({		
		events :{
			'submit .edit-book-form': 'saveBook',
			'click .delete': 'deleteBook'
		},		
		initialize: function () {
			this.model=new Book();
			this.collection= new Libros();
			console.log('Called collections ---> ', this.collection);			
			this.model.bind("reset", this.close);
		},
	    updateView: function() {
		  view.remove();
		  view.render();
		},		
		el: '#content' ,
		getTitle: function (options) {
			if(options.id)
				return "Edit Book"+options.id;
			else
				return "Add book";
		},
		render: function(options) {	
		//this.model=new Book();	
			var that = this;
			if(options.id) {
				console.log('INGRESANDO NUEVO ITEM');
				that.book = new Book({id:options.id});
				that.book.fetch({
					success: function(book) {
						console.log(JSON.stringify(book));
						var template = _.template($('#edit-user-template').html(), {book:book});
						console.log('editing');
						that.$el.html(template);
					}
				});
			}
			else {
				var template = _.template($('#edit-user-template').html(), {book:null });
				console.log('NUEVOOOOO id no existe');
				this.$el.html(template);
			}
		
		},			
		saveBook: function(evt) {
			console.log('SAVE BOOK CALLED---------->');
			var bookDetails = $(evt.currentTarget).serializeObject();
			var book = new Book();
			book.save(bookDetails , {
			success: function(book) {
				console.log("OK OK OK OK OK", JSON.stringify(book));
				this.close();
				window.history.back();				
				},
		    error: function (model, xhr, options) {
		        console.log("WRONG ---> Options: ", JSON.stringify(options) +' Model: ', JSON.stringify(model)+ ' Xhr:', JSON.stringify(xhr));
		        this.close();
				window.history.back();
		    }
			});	
			return false;
		},	
		deleteBook: function(evt) {
			this.book.destroy();  			
		},
	    close: function(){
	      this.remove();
	      this.unbind();
	      this.model.unbind("change", this.modelChanged);
	    }			
		});
return EditBook;
});