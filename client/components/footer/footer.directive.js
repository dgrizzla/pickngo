PICKNGO.directive('footer', function() {
  return {
    template: require('./footer.jade')(),
    restrict: 'E',
    link: function(scope, element) {
      element.addClass('footer');
    }
  };
});
