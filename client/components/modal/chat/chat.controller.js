'use strict';

PICKNGO.controller('ChatCtrl', function($scope, $http, Auth, $location, Notification) {

  $scope.modalView = "menuChat";
  $scope.items = [];
  $scope.setView = function(vista) {
    $scope.modalView = vista;
  };

  // function nuevaConversacion(mensaje){
  //   console.log('mensaje',mensaje);
  //   $http.post('api/mensajes/crearConversacion',{receptor:$scope.receptor.id,mensaje:mensaje})
  //     .then(respuesta=>{
  //       console.log('respuesta crear',respuesta);
  //     }).catch(error=>{
  //       Notification.error('Hubo un error enviando el mensaje.');
  //       console.error(error);
  //     });
  // }

  function getMensajes(idConversacion) {
    $http.get('api/mensajes/' + idConversacion)
      .then(mensajes => {
        console.info('mensajes!', mensajes)
        $scope.mensajes = mensajes.data.data;
        $scope.modalView = 'conversacion'
      }).catch(err => {
        Notification.error('Hubo un error cargando la conversación.');
        console.error(err);
      })
  }

  function refrescarMensajes(){
    $http.get('api/mensajes/' + $scope.idConversacion)
      .then(mensajes => {
        console.info('mensajes!', mensajes)
        $scope.mensajes = mensajes.data.data;
      }).catch(err => {
        Notification.error('Hubo un error cargando la conversación.');
        console.error(err);
      })    
  }

  function nuevoChat(usuario){
    $scope.receptor = usuario;
    $scope.modalView = 'conversacion';
    $scope.mensajes = [];
    $scope.idConversacion = -1;
  }

  $scope.nuevaConversacion = function(usuario) {
    //console.log('se va a enviar un mensaje nuevo a ', usuario.id);
    var usuarioMensaje = {nombres:usuario.nombres,apellidos:usuario.apellidos}
    $http.get('api/mensajes/usuarioConversacion/'+usuario.id)
      .then(result=>{
        if(result.data.data.length === 0){
          nuevoChat(usuarioMensaje);
        }else{
          usuarioMensaje.id_conversacion = result.data.data[0].id;
          $scope.abrirConversacion(usuarioMensaje);
        }
      }).catch(err=>{
        console.error(err)
      });
  }

  $scope.enviarMensaje = function(mensaje) {
    console.log('AAAAAHHHHHH', mensaje, "conversacion",$scope.idConversacion,"a usuario:",$scope.mensajes.idUsuario)
    if($scope.idConversacion === -1){
      $http.post('api/mensajes/nuevaConversacion',{})
        .then(result=>{
          
        }).catch(err=>{
          console.error(err);
        })

    }else{
      $http.post('api/mensajes/',{mensaje:mensaje,idConversacion:$scope.idConversacion})
        .then(result=>{
          console.info('ES ENVIO!',result);
          refrescarMensajes();
        }).catch(err=>{
          console.error(err);
        })
    }
    
  }

  $scope.abrirConversacion = function(conversacion) {
    console.log('id convo', conversacion);
    $scope.idConversacion = conversacion.id_conversacion;
    $scope.receptor = {"nombres": conversacion.nombres,"apellidos": conversacion.apellidos};
    getMensajes(conversacion.id_conversacion)
  }

  $scope.abrirChat = function(conversacion) {
    console.log('pota', conversacion)

  };

  $http.get('api/mensajes/conversaciones')
    .then(result => {
      //console.info('mensajes', result.data.data);
      $scope.conversaciones = result.data.data;
    }).catch(err => {
      Notification.error('Hubo un error cargando tus mensajes.');
      console.error(err);
    })

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