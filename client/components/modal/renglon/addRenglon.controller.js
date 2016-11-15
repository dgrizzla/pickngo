
/*@ngInject*/
module.exports = function ($scope, Api, $uibModalInstance, modalTimer, pngModals) {
  let articulos, imagenesUploader;
  $scope.addImagenes = evt => {
    evt.preventDefault();
    pngModals.renglon
      .imagenes(undefined, imagenesUploader)
      .result.then(uploader => imagenesUploader = uploader);
  };
  $scope.addArticulos = evt => {
    evt.preventDefault();
    pngModals.renglon
      .articulos(undefined, articulos)
      .result.then(arts => articulos = arts);
  };
  $scope.save = function () {
    Api.renglones.post({
      nombre: $scope.renglon.nombre,
      articulos: articulos
    }).then(onPost).catch(() => Api.toast.error('Ocurrio un error'));
  };
  function onPost(result) {
    if (result.code !== 0) {
      return Api.toast.error('Ocurrio un error');
    }
    if (imagenesUploader && imagenesUploader.queue.length !== 0) {
      imagenesUploader.removeAfterUpload = true;
      imagenesUploader.onBeforeUploadItem = item => {
        item.formData.push({
          id_renglon: result.data
        });
      };
      imagenesUploader.onErrorItem = () => Api.toast.error('Ocurrio un error al subir la imagen');
      imagenesUploader.onCompleteAll = onUploaderImagenes;
      imagenesUploader.uploadAll();
      return;
    }
    Api.toast('Se guardo el renglon');
    $scope.close();
  }
  function onUploaderImagenes(/*result*/) {
    Api.toast('Se guardo el renglon');
    $scope.close();
  }
  modalTimer($scope);
};