
/*@ngInject*/
module.exports = function ($scope, Api) {
  Api.renglones.getAllImagenes().then(imagenes => {
    $scope.imagenes = imagenes;
  });
};