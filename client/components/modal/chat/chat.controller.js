PICKNGO.controller('ChatCtrl', function ($scope, Api, $location, conversacionData) {

  $scope.modalView = "menuChat";
  $scope.items = [];

  $scope.setView = function (vista) {
    $scope.modalView = vista;
    if (vista === "menuChat") {
      getConversaciones();
    }
  };

  function getConversaciones() {
    Api.get('api/mensajes/conversaciones')
      .then(result => {
        //console.info('mensajes', result.data.data);
        $scope.conversaciones = result.data.data;
      }).catch(err => {
        Api.toast.error('Hubo un error cargando tus mensajes.');
        console.error(err);
      });
  }

  function getMensajes(idConversacion) {
    Api.get('api/mensajes/' + idConversacion)
      .then(mensajes => {
        $scope.mensajes = mensajes.data.data;
        $scope.modalView = 'conversacion';
      }).catch(err => {
        Api.toast.error('Hubo un error cargando la conversación.');
        console.error(err);
      });
  }

  function refrescarMensajes() {
    Api.get('api/mensajes/' + $scope.idConversacion)
      .then(mensajes => {
        $scope.mensaje = null;
        $scope.mensajes = mensajes.data.data;
      }).catch(err => {
        Api.toast.error('Hubo un error cargando la conversación.');
        console.error(err);
      });
  }

  function nuevoChat(usuario) {
    $scope.receptor = usuario;
    $scope.modalView = 'conversacion';
    $scope.mensajes = [];
    $scope.idConversacion = -1;
  }

  $scope.nuevaConversacion = function (usuario) {
    var usuarioMensaje = {
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      id_usuario: usuario.id
    };
    Api.get('api/mensajes/usuarioConversacion/' + usuario.id)
      .then(result => {
        if (result.data.data.length === 0) {
          nuevoChat(usuarioMensaje);
        } else {
          usuarioMensaje.id = result.data.data[0].id;
          $scope.abrirConversacion(usuarioMensaje);
        }
      }).catch(err => {
        console.error(err);
      });
  };

  $scope.enviarMensaje = function (mensaje) {
    if ($scope.idConversacion === -1) {
      Api.post('api/mensajes/nuevaConversacion', {
        mensaje: mensaje,
        receptor: $scope.receptor.id_usuario
      })
      .then(result => {
        if (result.data.code === 0) {
          $scope.idConversacion = result.data.data.idConversacion;
          refrescarMensajes();
        } else {
          Api.toast.error('Hubo un error enviando el mensaje.');
        }
      }).catch(err => {
        Api.toast.error('Hubo un error enviando el mensaje.');
        console.error(err);
      });
    } else {
      Api.post('api/mensajes/', {
        mensaje: mensaje,
        idConversacion: $scope.idConversacion
      }).then(() => {
        refrescarMensajes();
      }).catch(err => {
        Api.toast.error('Hubo un error enviando el mensaje.');
        console.error(err);
      });
    }

  };

  $scope.abrirConversacion = function (conversacion) {
    $scope.idConversacion = conversacion.id;
    if (conversacion.id1 == $scope.currentUser.id_usuario) {
      $scope.receptor = {
        "nombres": conversacion.nombres2,
        "apellidos": conversacion.apellidos2,
        "id": conversacion.id2
      };
    } else {
      $scope.receptor = {
        "nombres": conversacion.nombres1,
        "apellidos": conversacion.apellidos1,
        "id": conversacion.id1
      };
    }
    getMensajes(conversacion.id);
  };

  if (conversacionData == 0) {
    getConversaciones();
  } else if (conversacionData.isProducto === -1) {
    $scope.nuevaConversacion(conversacionData);
  } else {
    $scope.abrirConversacion(conversacionData);
  }

  $scope.buscarUsuario = function (busqueda) {
    Api.get('api/usuarios/busquedaUsuarioChat/' + busqueda)
      .then(result => {
        $scope.resultadoUsuarios = result.data.data;
        //console.info('result', result.data.data)
      }).catch(err => {
        console.error(err);
      });
  };

});
