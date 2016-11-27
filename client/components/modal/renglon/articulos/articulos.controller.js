
/*@ngInject*/
module.exports = function ($scope, Api, $uibModalInstance, modalTimer, renglon, articulos) {
  $scope.articulos = articulos || [];
  $scope.isInteger = Number.isInteger;
  $scope.articulo = {};

  function save() {
    Api.renglon.postArticulo(renglon, $scope.articulo);
    $scope.articulo = {};
  }

  function add() {
    if (Number.isInteger($scope.editIndex)) {
      $scope.articulos[$scope.editIndex] = $scope.articulo;
    } else {
      $scope.articulos.push($scope.articulo);
    }
    $scope.editIndex = undefined;
    $scope.articulo = {};
  }

  $scope.cancelar = function () {
    $scope.editIndex = undefined;
    $scope.articulo = {};
  };

  $scope.close = function () {
    $uibModalInstance.close($scope.articulos);
  };
  
  Api.categorias.getAll().then(categorias => {
    $scope.categorias = categorias;
    $scope.articulo.id_categoria = categorias[0].id;
    modalTimer($scope);
  }).catch(Api.catch('Ocurrio un error con las categorias'));
  $scope.removeArticulo = function (index) {
    $scope.articulos.splice(index, 1);
  };

  $scope.edit = function (index/*, id*/) {
    $scope.articulo = Object.assign({}, $scope.articulos[index]);
    if (!renglon) {
      $scope.editIndex = index;
    }
  };

  // si existe el renglon se guarda si no se agregar al arreglo a devolver
  $scope.save = renglon ? save : add;
};