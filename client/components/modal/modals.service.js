

PICKNGO.factory('pngModals', function($rootScope, $uibModal, $timeout) {
  const a = {};
  const modalTimer = (scope, time = 500) => $timeout(() => scope.load = true, time);
  const modalTimerResolve = function () {
    return modalTimer;
  }
  function openModal(size,controller, template, resolve = {}) {
    let scope = $rootScope.$new();
    scope.close = close;
    resolve.modalTimer = modalTimerResolve;
    let modalInstance = $uibModal.open({
      size, controller, template, resolve, scope,
      windowClass : 'png-modal',
      windowTopClass : 'top-modal',
      backdropClass : 'png-modal-backdrop'
    });
    function close() {
      modalInstance.close();
    }
    return modalInstance;
  }
  a.openEditOpcionesRol = function (rol) {
    return openModal(
      'md',
      require('./rol/editOpciones/editOpciones.controller.js'),
      require('./rol/editOpciones/editOpciones.jade')(),
      {
        rol : () => rol
      }
    );
  };

  a.openAddRol = function () {
    return openModal(
      'sm',
      require('./rol/addRol/addRol.controller.js'),
      require('./rol/addRol/addRol.jade')({tipo:'Crear'})
    );
  };

  a.openEditRol = function (rol) {
    return openModal(
      'sm',
      require('./rol/editRol/editRol.controller.js'),
      require('./rol/addRol/addRol.jade')({tipo:'Editar'}),
      {
        rol : () => rol
      }
    );
  };

  a.openEditUsuario = function (usuario) {
    return openModal(
      'md',
      require('./usuario/editUsuario/editUsuario.controller.js'),
      require('./usuario/editUsuario/editUsuario.jade')(),
      {
        usuario : () => usuario
      }
    );
  };
  a.openEditOpcion = function (opcion) {
    return openModal(
      'sm',
      require('./opcion/editOpcion/editOpcion.controller.js'),
      require('./opcion/addOpcion/addOpcion.jade')({tipo : 'Editar'}),
      {
        opcion : () => opcion
      }
    );
  };
  a.openAddOpcion = function (opcion) {
    return openModal(
      'sm',
      require('./opcion/addOpcion/addOpcion.controller.js'),
      require('./opcion/addOpcion/addOpcion.jade')({tipo : 'Crear'}),
      {
        opcion : () => opcion
      }
    );
  };
  a.openAddProveedor = function(proveedor){
    return openModal(
      'md',
      require('./proveedor/addProveedor/addProveedor.controller.js'),
      require('./proveedor/addProveedor/addProveedor.jade')({tipo:'Crear'}),
      {
        proveedor : () => proveedor
      }
    );
  };
  a.openEditProveedor = function(proveedor){
    return openModal(
      'md',
      require('./proveedor/editProveedor/editProveedor.controller.js'),
      require('./proveedor/addProveedor/addProveedor.jade')({tipo:'Editar'}),
      {
        proveedor : () => proveedor
      }
    );
  };
  a.openEditCategoriasProveedor = function (proveedor) {
    return openModal(
      'md',
      require('./proveedor/editCategorias/editCategorias.controller.js'),
      require('./proveedor/editCategorias/editCategorias.jade')(),
      {
        proveedor: () => proveedor
      }
    );
  };

  a.renglon = require('./modals.renglon.js')(openModal);
  $uibModal.modals = a;
  return a;
});
