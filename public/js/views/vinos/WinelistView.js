define([
    'jquery'
    ,'underscore'
    ,'backbone'   
    ,'isotope'
    ,'bridget'
    ,'views/vinos/paginator'
    ,'views/vinos/WineListItemView'
    ,'views/vinos/paginator'
    ,'collections/vinosCollection'
    ,'models/vinoModel'
    ,'text!templates/vinos/WineListItemView.html'
    ],function($,_, Backbone, isotope, bridget, page, WineListItemView, Paginator, WineCollection, VinoModel, vinoItemTemplate){
    var WineListView = Backbone.View.extend({
        //el:'#content',
        initialize: function () {            
            this.render();
        },
        render: function () {            

            /*var $container = $('#vinos');
            $container.isotope({
                itemSelector: '.element'
            });
              var isotope = $container.data('isotope');*/

            var wines = this.model.models;
            var len = wines.length;
            var startPos = (this.options.page - 1) * 8;
            var endPos = Math.min(startPos + 8, len);
            $(this.el).html('<ul class="thumbnails"></ul>');
             $.bridget( 'isotope', isotope );   
            for (var i = startPos; i < endPos; i++) {
                             console.log('VINOOOOS ---> ', wines[i]);
                //this.$el.find('#vinos').append(new WineListItemView({model: wines[i]}).render().el);  
                $('.thumbnails', this.el).append(new WineListItemView({model: wines[i]}).render().el);
            }

            $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);
            
            return this;
        }
    });
    return WineListView;
});

