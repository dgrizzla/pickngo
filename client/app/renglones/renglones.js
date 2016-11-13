
PICKNGO.config(function($stateProvider) {
  $stateProvider.state('renglones', {
    url: '/',
    template: require('./renglones.jade')(),
    controller: require('./renglones.controller.js')
  });
});
