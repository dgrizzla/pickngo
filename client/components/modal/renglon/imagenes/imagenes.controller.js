

/*@ngInject*/
module.exports = function ($scope, Api, $uibModalInstance, modalTimer, renglon, imagenesUploader) {
  var uploader = imagenesUploader || Api.newUploader('/api/renglones/imagen', [
    'jpg',
    'png',
    'jpeg',
    'bmp',
    'gif'
  ]);
  $scope.uploader = uploader;


  $scope.save = function () {
    if (Number.isInteger(renglon)) {
      if (uploader && uploader.queue.length !== 0) {
        uploader.removeAfterUpload = true;
        uploader.onBeforeUploadItem = item => {
          item.formData.push({id_renglon: renglon});
        };
        uploader.onErrorItem = () => Api.toast.error('Ocurrio un error al subir las imagenes');
        uploader.onCompleteAll = onUploaderImagenes;
        uploader.uploadAll();
        return;
      }
    }
    $uibModalInstance.close(uploader);
  };

  function onUploaderImagenes() {
    $uibModalInstance.close(uploader);
  }

  $scope.remove = id => Api.renglones.deleteImagen(id).then(() => {
    Api.toast.success('Se elimino correctamente la imagen');
    getImagenes();
  }).catch(Api.catch('No se pudo eliminar la imagen'));


  function getImagenes() {
    Api.renglones.getImagenes(renglon).then(imagenes =>{
      $scope.imagenes = imagenes;
    }).catch(Api.catch('Error con las imagenes'));
  }

  if (Number.isInteger(renglon)) getImagenes();

  modalTimer($scope);
};