'use strict';

PICKNGO.controller('ChatCtrl', function($scope, $http, Auth, $location, Notification,conversacionData) {

  $scope.modalView = "menuChat";
  $scope.items = [];
  console.info('convo',conversacionData)

  $scope.setView = function(vista) {
    $scope.modalView = vista;
    if(vista == "menuChat"){
      getConversaciones();
    }
  };

  function getConversaciones() {
    $http.get('api/mensajes/conversaciones')
      .then(result => {
        //console.info('mensajes', result.data.data);
        $scope.conversaciones = result.data.data;
      }).catch(err => {
        Notification.error('Hubo un error cargando tus mensajes.');
        console.error(err);
      })
  }

  function getMensajes(idConversacion) {
    $http.get('api/mensajes/' + idConversacion)
      .then(mensajes => {
        $scope.mensajes = mensajes.data.data;
        $scope.modalView = 'conversacion'
      }).catch(err => {
        Notification.error('Hubo un error cargando la conversación.');
        console.error(err);
      })
  }

  function refrescarMensajes() {
    $http.get('api/mensajes/' + $scope.idConversacion)
      .then(mensajes => {
        console.info('mensajes!', mensajes)
        $scope.mensaje = null;
        $scope.mensajes = mensajes.data.data;
      }).catch(err => {
        Notification.error('Hubo un error cargando la conversación.');
        console.error(err);
      })
  }

  function nuevoChat(usuario) {
    $scope.receptor = usuario;
    $scope.modalView = 'conversacion';
    $scope.mensajes = [];
    $scope.idConversacion = -1;
  }

  getConversaciones();

  $scope.nuevaConversacion = function(usuario) {
    var usuarioMensaje = {
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      id_usuario: usuario.id
    }
    $http.get('api/mensajes/usuarioConversacion/' + usuario.id)
      .then(result => {
        if (result.data.data.length === 0) {
          nuevoChat(usuarioMensaje);
        } else {
          usuarioMensaje.id = result.data.data[0].id;
          $scope.abrirConversacion(usuarioMensaje);
        }
      }).catch(err => {
        console.error(err)
      });
  }

  $scope.enviarMensaje = function(mensaje) {
    if ($scope.idConversacion === -1) {
      $http.post('api/mensajes/nuevaConversacion', {
          mensaje: mensaje,
          receptor: $scope.receptor.id_usuario
        })
        .then(result => {
          if (result.data.code === 0) {
            $scope.idConversacion = result.data.data.idConversacion;
            refrescarMensajes();
          } else {
            Notification.error('Hubo un error enviando el mensaje.')
          }
        }).catch(err => {
          Notification.error('Hubo un error enviando el mensaje.')
          console.error(err);
        })

    } else {
      $http.post('api/mensajes/', {
          mensaje: mensaje,
          idConversacion: $scope.idConversacion
        })
        .then(result => {
          refrescarMensajes();
        }).catch(err => {
          Notification.error('Hubo un error enviando el mensaje.')
          console.error(err);
        })
    }

  }

  $scope.abrirConversacion = function(conversacion) {
    $scope.idConversacion = conversacion.id;
    if(conversacion.id1 == $scope.currentUser.id_usuario){
      $scope.receptor = {
        "nombres": conversacion.nombres2,
        "apellidos": conversacion.apellidos2,
        "id": conversacion.id2
      };
    }else{
      $scope.receptor = {
        "nombres": conversacion.nombres1,
        "apellidos": conversacion.apellidos1,
        "id": conversacion.id1
      };
    }
    getMensajes(conversacion.id)
  }

  if(conversacionData != 0){
    $scope.abrirConversacion(conversacionData);
  };

  $scope.buscarUsuario = function(busqueda) {
    $http.get('api/usuarios/busquedaUsuarioChat/' + busqueda)
      .then(result => {
        $scope.resultadoUsuarios = result.data.data;
        //console.info('result', result.data.data)
      }).catch(err => {
        console.error(err);
      });
  }

});