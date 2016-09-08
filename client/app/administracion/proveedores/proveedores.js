PICKNGO.config(function($stateProvider) {
  $stateProvider.state('administracion.proveedores', {
    parent: 'administracion',
    url: '/proveedores',
    template: require('./proveedores.jade')(),
    controller: require('./proveedores.controller.js')
  });
});