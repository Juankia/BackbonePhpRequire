// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.

require.config({
    //'baseUrl': "js/",
    'paths': {
        jquery: 'libs/jquery-1.10.0.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone',
        backboneMaster: 'libs/backbone.cleanup-amd',
        backboneCustom: 'libs/backbone.custom',
        backboneParams:'libs/backbone.queryparams',
        backboneValidate:'libs/backbone-validation',                
        foundation: 'libs/foundation.min',
        bridget:'libs/isotope/jquery.bridget', 
        isotope:'libs/isotope/isotope.pkgd',   
        bridget:'libs/isotope/jquery.bridget',    
        isotope_item: 'libs/isotope/item',        
        layout_mode: 'libs/isotope/layout-mode',  
        fit_rows: 'libs/isotope/layout-modes/fit-rows',
        masonry: 'libs/isotope/layout-modes/masonry',
        vertical:'libs/isotope/layout-modes/vertical',    
        templates: '../templates'
    },
    'shim': {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        backboneCustom: {
            deps: ['backbone'],
            exports: 'backboneCustom'
        },
        'underscore': {
            exports: '_'
        },        
        'isotope' :{
            deps: ['bridget','jquery']
        },        
        'validate' :{
            deps: ['jquery']
        },
        'foundation' :{
            deps: ['jquery']
        },                        
        'backboneValidate' : {
            deps:['jquery', 'backbone']
        },
        'backboneParams' : {
            deps:['backbone']
        }
    } 

});

require(['app'], function(App){
    //App.initialize();
});