
PICKNGO.config(function($stateProvider) {
  console.log(require('./roles.jade')());
  $stateProvider.state('administracion.roles', {
    parent: 'administracion',
    url: '/roles',
    template: require('./roles.jade')(),
    controller: require('./roles.controller.js')
  });
});