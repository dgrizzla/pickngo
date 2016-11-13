

/*@ngInject*/
module.exports = function ($scope, Api, $uibModalInstance, modalTimer, renglon, imagenesUploader) {
  var uploader = $scope.uploader = imagenesUploader || Api.newUploader([
    'jpg',
    'png',
    'jpeg',
    'bmp',
    'gif'
  ]);

  $scope.close = function () {
    $uibModalInstance.close(uploader);
  };

  modalTimer($scope);
};