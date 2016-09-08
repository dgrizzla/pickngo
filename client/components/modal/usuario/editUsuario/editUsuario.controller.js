
const moment = require('moment');

/*@ngInject*/
module.exports = function ($scope, Api, NgTableParams, $uibModalInstance, $timeout, usuario, modalTimer) {
  Api.usuarios.getUsuario(usuario, onGetUsuario);
  Api.proveedores.getInfoProveedores(onGetInfoProveedores);
  Api.roles.getRoles(onGetRoles);
  Api.getPaises(onGetPaises);

  function onGetInfoProveedores(result) {
    $scope.proveedores = result.data;
  }
  function onGetRoles(result) {
    $scope.roles = result.data;
  }
  function onGetPaises(result) {
    $scope.paises = result.data;
  }

  function onGetUsuario(result) {
    modalTimer($scope, 1000);
    if (result.code !== 0) {
      return Api.toast.error('Hubo un error, intentelo de nuevo');
    }
    if (!result.data) {
      return;
    }
    let date = moment(new Date(result.data.fecha_nac));
    result.data.fecha_nac_day = date.date();
    result.data.fecha_nac_month = date.month();
    result.data.fecha_nac_year = date.year();
    result.data.telefono = Number(result.data.telefono); 
    $scope.usuario = result.data;
    
    //$scope.usuario = result.data
  }

  $scope.saveUsuario = function () {
    Api.usuarios.putUsuario(
      usuario,
      $scope.usuario,
      onPut
    );
  };
  function onPut(result) {
    if (result.code !== 0) {
      return Api.toast.error('Hubo un error, intentelo de nuevo');
    }
    Api.toast.success('Se editor correctamente');
    return  $uibModalInstance.close(true);
  }
  $scope.close  = function () {
    $uibModalInstance.dismiss();
  }
};