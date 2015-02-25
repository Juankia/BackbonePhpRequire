define([
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'text!templates/vinos/WineListItemView.html'
    ],function($, _, Backbone, indexVinos){
     var WineListItemView = Backbone.View.extend({   
        tagName: "li",        
        className: "element",
        initialize: function () {
            _.bindAll(this);    
            this.$el.attr('data-category', 'transition');   
            this.$el.css({'-webkit-transform': 'translate3d(5px, 5px, 0px)', 'height': '280px'});   
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        },

        render: function () {
            this.$el.html(_.template(indexVinos, this.model.toJSON()));               
            return this;
        }
    });
     return WineListItemView;
});
