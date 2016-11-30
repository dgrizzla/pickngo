
PICKNGO.controller('DashboardCtrl', function($scope, Api, NgTableParams, $uibModal) {
  Api.getCurrentUser();

  Api.get('api/departamentos/countDeptos')
    .then(result => {
      $scope.countDeptos = result.data.data.numDeptos;
    }).catch(err => {
      Api.toast.error('Hubo un cargando los departamentos.');
      console.error(err);
    });
  Api.get('api/productos/')
    .then(result => {
      $scope.productos = result.data.data;
    }).catch(error => {
      console.error(error);
      Api.toast.error('Hubo un error cargando tus productos');
    });

  Api.get('api/productos/countProductos')
    .then(function(result) {
      $scope.countProductos = result.data.data.countProductos;
    }).catch(function(err) {
      Api.toast.error('Hubo un error cargando tus productos');
      console.error(err);
    });

  Api.get('api/mensajes/conversaciones')
    .then(result => {
      $scope.chats = result.data.data;
    }).catch(err => {
      Api.toast.error('Hubo un error cargando los chats.');
      console.error(err);
    });

  Api.get('api/mensajes/countConversaciones')
    .then(result => {
      $scope.numConversaciones = result.data.data[0].numConversaciones;
    }).catch(err => {
      Api.toast.error('Hubo un error en el servidor');
      console.error(err);
    });

  $scope.openChat = function(conversacion) {
    if (!conversacion) {
      conversacion = 0;
    }
    $uibModal.open({
      template: require('../../components/modal/chat/chat.jade')(),
      controller: 'ChatCtrl',
      resolve: {
        conversacionData: function() {
          return conversacion;
        }
      },
      size: 'md'
    });
  };

  Api.get('api/usuarios/countUsuarios')
    .then(result => {
      $scope.numUsuarios = result.data.data[0].numUsuarios;
    }).catch(err => {
      console.error(err);
    });

});