define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {
    var AppManagerView = Backbone.View.extend({
        currentView: null,
        el: $('#page'),
        $elMenubar: $('#menubar'),
        menuSelecionado:null,
        menuPrincipalView: null,
        barraRentaView: null,

        cargarMenuBarAndBarra: function(){
            var self=this;
            require([
                    'views/menubar/MenuPrincipalView',
                    'views/barraRenta/BarraRentaView',
                    'views/Widget/WidgetHerramientasView'
                ], function(menuPrincipalView, barraRentaView, widgetHerramientasView){
                    self.menuPrincipalView = menuPrincipalView;
                    self.menuPrincipalView.$elContainer = self.$elMenubar;
                    self.menuPrincipalView.render();

                    self.barraRentaView = barraRentaView;
                    self.barraRentaView.render();

                    self.iniciarWidgetBusqueda(widgetHerramientasView);

                    $(window).scroll(function () {
                        if ($(this).scrollTop() > 5) {
                            $('#menubar').css({'position':'fixed','z-index':'100'});
                            if ($('#barra-rentas').hasClass('tablaIndicesUp')){
                                $('#barra-rentas').removeClass('tablaIndicesUp');
                            }        
                            $('#barra-rentas').addClass('tablaIndicesDown');
                            $('#page').css({'padding-bottom':'100px'})
                            $('#widgetsHerramientas').css({'padding-top':'100px'})
                            
                            

                        }else{
                            $('#menubar').css({'position':'relative'});
                            if ($('#barra-rentas').hasClass('tablaIndicesDown')){
                                $('#barra-rentas').removeClass('tablaIndicesDown');
                            }
                            $('#barra-rentas').addClass('tablaIndicesUp');
                            $('#page').css({'padding-bottom':'0px'});
                            $('#widgetsHerramientas').css({'padding-top':'165px'})
                        }
                    });
                }
            );
            
        },

        iniciarWidgetBusqueda:function(widgetHerramientasView){
            require([
                    'shortcut',
                    'views/Widget/widgetBuscarActivoView'
                ], function(_shortcut, widgetBuscarActivoView){
                    $('#widgetBuscar').html(widgetBuscarActivoView.render().el);

                    shortcut.add("Ctrl+B",function() {
                        widgetBuscarActivoView.openWidget();
                        $('#nombreActivoWidget').focus();
                    });
                    shortcut.add("Esc",function() {
                        widgetBuscarActivoView.closeWidget();
                    });
                    shortcut.add("Ctrl+Shift+B",function() {
                        app_router.navigate('/mercadoBursatilInternacional',true);
                    });
                    shortcut.add("Ctrl+Shift+N",function() {
                        app_router.navigate('/mercadoBursatilNacional',true);
                    });
                    shortcut.add("Ctrl+O",function() {
                        widgetHerramientasView.cargarOrdenVirtualWidget(null);
                    });
                     shortcut.add("Ctrl+K",function() {
                        var bloombergTv=window.open('','','width=660,height=430, resizable=no');
                        bloombergTv.document.write("<object data=http://www.bloomberg.com/tv/?page_type=embed width=645 height=400 ></object> ");
                    });
                }
            );
        },

        showView: function(view) {
            this.currentView && (this.currentView.close ? this.currentView.close() : this.currentView.remove());
            this.currentView=null;
            this.currentView = view;
            this.$el.html(this.currentView.render().el);
        },

        removeMenuBar: function(){
            this.menuPrincipalView=null;
        },

        seleccionarMenu: function(titlePage, idMenuSelect,idSubMenuSelect,idSubItemSelect){
            $(document).attr('title', titlePage);
            $('#menubar .left a.menu-select-opcion').removeClass('menu-select-opcion');
            $('#menubar .left a.select-sub-option').removeClass('select-sub-option');
            $('#menubar .left li.select-has-sub').removeClass('select-has-sub');
            $('#menubar '+idMenuSelect).addClass('menu-select-opcion'); 
            if(idSubMenuSelect){
                $('#menubar '+idMenuSelect).parent().addClass('select-has-sub');                
                $('#menubar '+idSubMenuSelect).addClass('select-sub-option');
            }
            if(idSubItemSelect){
                $('#menubar '+idSubMenuSelect).parent().addClass('select-has-sub');
                $('#menubar '+idSubItemSelect).addClass('select-sub-option');
            }
            this.menuSelecionado={
                titlePage:titlePage,
                idMenuSelect:idMenuSelect,
                idSubMenuSelect:idSubMenuSelect,
                idSubItemSelect:idSubItemSelect
            }
        }


    });

    var appManagerView = appManagerView || new AppManagerView();
    return appManagerView;
});