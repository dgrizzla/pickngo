

PICKNGO.factory('pngModals', function($rootScope, $uibModal) {
  const a = {};
  function openModal(size,controller, template, resolve) {
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
      require('./rol/addRol/addRol.jade')()
    );
  };

  a.openEditRol = function (rol) {
    return openModal(
      'sm',
      require('./rol/editRol/editRol.controller.js'),
      require('./rol/addRol/addRol.jade')(),
      {
        rol : () => rol
      }
    );
  }

  $uibModal.modals = a;
  return a;
});