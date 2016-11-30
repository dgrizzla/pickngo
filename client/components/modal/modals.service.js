PICKNGO.factory('pngModals', function ($rootScope, $uibModal, $timeout) {
  const obj = {};
  const modalTimer = (scope, time = 500) => $timeout(() => scope.load = true, time);
  const modalTimerResolve = function () {
    return modalTimer;
  };

  function openModal(size, controller, template, resolve = {}) {
    let scope = $rootScope.$new();
    scope.close = close;
    resolve.modalTimer = modalTimerResolve;
    let modalInstance = $uibModal.open({
      size,
      controller,
      template,
      resolve,
      scope,
      windowClass: 'png-modal',
      windowTopClass: 'top-modal',
      backdropClass: 'png-modal-backdrop'
    });

    function close() {
      modalInstance.close();
    }
    return modalInstance;
  }
  obj.openEditOpcionesRol = function (rol) {
    return openModal(
      'md',
      require('./rol/editOpciones/editOpciones.controller.js'),
      require('./rol/editOpciones/editOpciones.jade')(), {
        rol: () => rol
      }
    );
  };

  obj.openAddRol = function () {
    return openModal(
      'sm',
      require('./rol/addRol/addRol.controller.js'),
      require('./rol/addRol/addRol.jade')({
        tipo: 'Crear'
      })
    );
  };

  obj.openEditRol = function (rol) {
    return openModal(
      'sm',
      require('./rol/editRol/editRol.controller.js'),
      require('./rol/addRol/addRol.jade')({
        tipo: 'Editar'
      }), {
        rol: () => rol
      }
    );
  };

  obj.openEditUsuario = function (usuario) {
    return openModal(
      'md',
      require('./usuario/editUsuario/editUsuario.controller.js'),
      require('./usuario/editUsuario/editUsuario.jade')(), {
        usuario: () => usuario
      }
    );
  };
  obj.openEditOpcion = function (opcion) {
    return openModal(
      'sm',
      require('./opcion/editOpcion/editOpcion.controller.js'),
      require('./opcion/addOpcion/addOpcion.jade')({
        tipo: 'Editar'
      }), {
        opcion: () => opcion
      }
    );
  };
  obj.openAddOpcion = function (opcion) {
    return openModal(
      'sm',
      require('./opcion/addOpcion/addOpcion.controller.js'),
      require('./opcion/addOpcion/addOpcion.jade')({
        tipo: 'Crear'
      }), {
        opcion: () => opcion
      }
    );
  };
  obj.openAddProveedor = function (proveedor) {
    return openModal(
      'md',
      require('./proveedor/addProveedor/addProveedor.controller.js'),
      require('./proveedor/addProveedor/addProveedor.jade')({
        tipo: 'Crear'
      }), {
        proveedor: () => proveedor
      }
    );
  };
  obj.openEditProveedor = function (proveedor) {
    return openModal(
      'md',
      require('./proveedor/editProveedor/editProveedor.controller.js'),
      require('./proveedor/addProveedor/addProveedor.jade')({
        tipo: 'Editar'
      }), {
        proveedor: () => proveedor
      }
    );
  };
  obj.openEditCategoriasProveedor = function (proveedor) {
    return openModal(
      'md',
      require('./proveedor/editCategorias/editCategorias.controller.js'),
      require('./proveedor/editCategorias/editCategorias.jade')(), {
        proveedor: () => proveedor
      }
    );
  };

  obj.renglon = require('./modals.renglon.js')(openModal);
  $uibModal.modals = obj;
  return obj;
});
