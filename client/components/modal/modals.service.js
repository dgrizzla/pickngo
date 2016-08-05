

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
  a.openEditarOpcionesRol = function (rol) {
    return openModal(
      'md',
      require('./rol/editarOpciones/editarOpciones.controller.js'),
      require('./rol/editarOpciones/editarOpciones.jade')(),
      {
        rol : () => rol
      }
    );
  }
  $uibModal.modals = a;
  return a;//$uibModal
});