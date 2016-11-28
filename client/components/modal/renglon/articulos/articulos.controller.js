
/*@ngInject*/
module.exports = function ($scope, Api, $uibModalInstance, modalTimer, renglon, articulos) {
  $scope.newArticulos = articulos || [];
  $scope.isInteger = Number.isInteger;
  $scope.articulo = {};

  function save() {
    if ($scope.articulo && Number.isInteger($scope.articulo.id)) {
      return Api.renglones.putArticulo($scope.articulo.id, $scope.articulo)
        .then(() => {
          $scope.articulo = {};
          getArticulos();
        }).catch(Api.catch('No se pudo editar el articulo'));
    }
    Api.renglones.postArticulo(
      Object.assign({id_renglon: renglon}, $scope.articulo)
    ).then(() => {
      $scope.articulo = {};
      $scope.editIndex = undefined;
      getArticulos();
    }).catch(Api.catch('No se pudo agregar el articulo'));
  }

  function add() {
    if (Number.isInteger($scope.editIndex)) {
      $scope.newArticulos[$scope.editIndex] = $scope.articulo;
    } else {
      $scope.newArticulos.push($scope.articulo);
    }
    $scope.editIndex = undefined;
    $scope.articulo = {};
  }

  $scope.cancelar = function () {
    $scope.editIndex = undefined;
    $scope.articulo = {};
  };
  
  Api.categorias.getAll().then(categorias => {
    $scope.categorias = categorias;
    $scope.articulo.id_categoria = categorias[0].id;
    modalTimer($scope);
  }).catch(Api.catch('Ocurrio un error con las categorias'));
  $scope.removeNewArticulo = function (index) {
    $scope.newArticulos.splice(index, 1);
  };

  $scope.removeArticulo = id => Api.renglones
    .deleteArticulo(id).then(getArticulos)
    .catch(Api.catch('No se pudo eliminar el articulos'));

  $scope.edit = function (index/*, id*/) {
    $scope.articulo = Object.assign({}, $scope.newArticulos[index] || $scope.articulos[index]);
    $scope.editIndex = index;
  };

  $scope.closeSave = () => $uibModalInstance.close($scope.newArticulos);

  function getArticulos() {
    Api.renglones.getArticulos(renglon).then(articulos =>{
      $scope.articulos = articulos;
    }).catch(Api.catch('Error con las articulos'));
  }

  if (Number.isInteger(renglon)) {
    getArticulos();
    $scope.save = save;
  } else {
    $scope.save = add;
  }
};