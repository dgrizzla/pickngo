
PICKNGO.config(function ($stateProvider) {
  $stateProvider.state('editarProducto', {
    params: {producto: null},
    url: '/editarProducto',
    template: require('./editarProducto.jade')(),
    controller: 'EditarProductoCtrl',
  });
});