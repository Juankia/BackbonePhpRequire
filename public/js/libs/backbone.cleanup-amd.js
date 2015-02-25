define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    Backbone.MasterView = Backbone.View.extend({
        constructor: function() {
            this.subViews = [];
            Backbone.View.prototype.constructor.apply(this, arguments);
        },

        setSubView: function(view) {
            this.subViews.push(view);
        },

        close: function() {
            //console.log('cerrar : asd '+this.cid+' - '+this.subViews.length);
            _.each(this.subViews, function(view) {                 
                view.close();  
            });
            if (this.cambioDatos){ 
                if (this.collection){
                    this.collection.each(function(model) {
                        if (model.get("valores")){
                            model.get("valores").each(function(valor){   
                                socket.emit('unsubscribe', { tickerId: model.id, field: valor.id });
                            });
                        }                    
                    }, this);
                }

                if (this.collectionTodo){
                    this.collectionTodo.each(function(model) {
                        if (model.view) model.view.close();
                        if (model.get("valores")){
                            model.get("valores").each(function(valor){   
                                socket.emit('unsubscribe', { tickerId: model.id, field: valor.id });
                            });
                        }                    
                    }, this);
                }     
            }
            if (this.collection){
                //console.log('tamnio collection: '+this.collection.length);
                this.collection.each(function(model) {
                    if (model.view) model.view.close();
                }, this);
                this.collection.reset();
                this.collection.off(null, null, this);
                this.collection=null;
                
            }


            
            if (this.model){
                if (this.cambioDatos){
                    if (this.model.get("valores")){
                        var self=this;
                        this.model.get("valores").each(function(valor){   
                            socket.emit('unsubscribe', { tickerId: self.model.id, field: valor.id });
                        });
                    }
                }
                this.model.unbind();
                this.model.clear();
                this.model.off(null, null, this);
            }
            if (this.cambioDatos && socket) socket.removeListener('receive-stock-quote', this.cambioDatos);
            if (this.detectScroll){
                $(window).off("scroll", this.detectScroll); 
            }
            //if (this.cambioDatos) {console.log('tienen socket');socket.removeListener('receive-stock-quote', this.cambioDatos)}else{console.log('no tienen socket');};           
            if(this.interval)
                clearInterval(this.interval);

            this.unbind(); 
            this.undelegateEvents();
            this.$el.remove();
            this.$el.html('');
            $(this.el).empty();

            //Remove view from DOM            
            this.remove();            

        }

    });

    return Backbone;
});