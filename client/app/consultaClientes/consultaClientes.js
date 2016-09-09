PICKNGO.config(function($stateProvider) {
  $stateProvider.state('consultaClientes', {
    url: '/consultaClientes',
    template: require('./consultaClientes.jade')(),
    controller: require('./consultaClientes.controller.js')
  });
});