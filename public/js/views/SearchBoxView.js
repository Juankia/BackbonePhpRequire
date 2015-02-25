define([ 
 	'jquery',
 	'underscore'
 	,'backboneMaster'
 	,'views/SearchListView'
	],function($, _, Backbone, SearchListView){
		var SearchBoxView = Backbone.View.extend({
			el:'.head',
			initialize: function() {		
		},
		events: {
			'keyup #searchText' : 'searchUser'
		},
	  
		searchUser: function(evt) {
			var self = this;
			if(self.timer)
				clearTimeout(self.timer);
				self.timer = setTimeout(function() {
				console.log('fired');
				var query = $('#searchText').val();
			console.log('search --> '+query);
			if(query.length>0) {
				router.navigate('#/search/'+query, {trigger : false});
			}
			else {
				router.navigate('#', {trigger:false});
			}
			var searchlist = new SearchListView();
			searchlist.render({name:query})
			return false; 
			self.timer = null;
				}, 300);
		}
			
	});
	return SearchBoxView;
});