
PICKNGO.config(function($stateProvider) {
  $stateProvider.state('productoUsuario', {
    url: '/productoUsuario',
    template: require('./productoUsuario.jade')(),
    controller: "ProductoUsuarioCtrl"
  });
});
