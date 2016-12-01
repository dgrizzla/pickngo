
PICKNGO.config(function($stateProvider) {
  $stateProvider.state('renglones', {
    url: '/renglones',
    template: require('./renglones.jade')(),
    controller: require('./renglones.controller.js')
  });
});
