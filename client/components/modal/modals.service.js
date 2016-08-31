

PICKNGO.factory('pngModals', function($rootScope, $uibModal, $timeout) {
  const a = {};
  const modalTimer = (scope, time = 500) => $timeout(() => scope.load = true, time);
  const modalTimerResolve = function () {
    return modalTimer;
  }
  function openModal(size,controller, template, resolve = {}) {
    resolve.modalTimer = modalTimerResolve;
    return $uibModal.open({
      size, controller, template, resolve,
      windowClass : 'png-modal',
      windowTopClass : 'top-modal',
      backdropClass : 'png-modal-backdrop'
    });
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

  $uibModal.modals = a;
  return a;
});
