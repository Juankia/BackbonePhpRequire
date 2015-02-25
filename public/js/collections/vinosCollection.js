define([
	'jquery'
	,'underscore'
 	,'backbone'
 	,'models/vinoModel'
	], function($,_,Backbone,VinoModel){	
	 var WineCollection = Backbone.Collection.extend({
	    model: VinoModel
	    ,url: "../server/index.php/wines"    
	});
	return WineCollection;
});