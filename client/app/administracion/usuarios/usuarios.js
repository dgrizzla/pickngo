
PICKNGO.config(function($stateProvider) {
  $stateProvider.state('administracion.usuarios', {
    parent: 'administracion',
    url: '/usuarios',
    template: require('./usuarios.jade')(),
    controller: require('./usuarios.controller.js')
  });
});