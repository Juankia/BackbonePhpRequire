define([
	 	'jquery',
	 	'underscore',
	 	'backbone',
	 	'totalStorage',
	 	'models/auth/UsuarioLoginModel'
	], function($, _, Backbone, totalStorage, UsuarioLoginModel){
		
		var SessionManager = function (){
			this.auth = null;
			this.user = null;
			this.usuarioLoginModel = null;
			this.lastUrl= null;
		};
		
		SessionManager.prototype = {
			init : function(){
				//this.sincronizarSesion();
				_.extend(this, Backbone.Events);
			},

			// Sincronizar la sesion del cliente y el servidor
			sincronizarSesion: function(callback) {
				// Cargar el access token y uer ID del web storage/cookie
				this.auth = $.totalStorage('auth');
				this.user = $.totalStorage('user');
		        
		        // Establecer los headers necesarios para autorizacion
		        this.setupAuthHeaders();
		        // Sincronizar usuarioLoginModel con el servidor

		        var usuarioLoginModel = new UsuarioLoginModel();
		        var that = this;
				usuarioLoginModel.fetch({
					url: '/yo',
					success: function(){
						that.setUsuarioLoginModel(usuarioLoginModel);
						return callback(true); //CAMBIAR POR EL IDIOMA DEL USUARIO LOGUEADO
					},

					error: function(e, response){
						if(response.status == 401){
							$.totalStorage.deleteItem('auth');
							$.totalStorage.deleteItem('user');
							that.auth=null;
							that.user=null;
						}
						return callback(false)
					} 
						
				});
		    },

		    setUsuarioLoginModel: function(usuarioLoginModel){
		    	this.usuarioLoginModel=new UsuarioLoginModel();
		    	this.usuarioLoginModel.set(usuarioLoginModel.toJSON());
		    	//console.log('SESSIONA MANAGER A CAPTURADO DATOS DE SESION, LANZANDO EVENTO');
				this.trigger("sesionIniciada", "an event");
				this.setupAuthHeaders();
		    },

		    setTocketUser: function(usuarioLoginModel){
		    	this.auth = $.totalStorage('auth', usuarioLoginModel.get('persona').accessToken);
				this.user = $.totalStorage('user', usuarioLoginModel.get('persona').id);
		    },

		    // Establecer los headers necesarios para autorizacion
		    setupAuthHeaders: function(){
		    	var that = this;
		    	$.ajaxSetup({beforeSend: function(jqXHR){
			        jqXHR.setRequestHeader("Authorization", that.auth);
			        jqXHR.setRequestHeader("User-ID", that.user);			      
			        //jqXHR.setRequestHeader('withCredentials', 'true');
			        //jqXHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			        //"X-Requested-With": "XMLHttpRequest"
			        //withCredentials: 
			    }});
		    },

		    estaLogeado: function(){
		    	if(this.usuarioLoginModel != null)
		    		return true;
		    	else
		    		return false;
		    },

		    setLastUrl: function(lastUrl){
		    	this.lastUrl=lastUrl;
		    },

		    borrarTocken: function(){
		    	$.totalStorage.deleteItem('auth');
				$.totalStorage.deleteItem('user');	
				this.usuarioLoginModel.clear();
				this.usuarioLoginModel =null;
		    }
		};
		
		var sessionManager;
		if(!sessionManager){
			// Iniciacion del sessionManager
			sessionManager = new SessionManager();
			sessionManager.init();
		}

		return sessionManager;
	}
);