

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

  $scope.close = function () {
    $uibModalInstance.close(uploader);
  };

  modalTimer($scope);
};