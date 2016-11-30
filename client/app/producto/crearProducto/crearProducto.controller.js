const moment = require('moment');

PICKNGO.controller('CrearProductoCtrl', function($scope, Api, $state, FileUploader) {
  Api.getCurrentUser();
  $scope.producto = {};
  $scope.fechaVencimiento = {};
  var anioActual = moment().get('year');
  $scope.aniosMax = [anioActual, anioActual + 1];

  var uploader = $scope.uploader = new FileUploader({
    url: 'components/upload/imgProducto'
  });

  uploader.filters.push({
    name: 'imageFilter',
    fn: function(item /*{File|FileLikeObject}*/ /*, options*/) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|'.indexOf(type) !== -1;
    }
  });

  uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter/*, options*/) {
    console.log(filter);
    //filter.name === "queueLimit" ? Api.toast.info('El límite de imágenes es de 4.') : Api.toast('Formato de archivo inválido.');
    filter.name === "imageFilter" ? Api.toast('Formato de imagen inválido.') : Api.toast('Error cargando la imagen.');
  };

  uploader.onBeforeUploadItem = function(item) {
    var data = {
      idProducto: $scope.idProducto,
      orden: item.index
    };
    item.formData.push(data);
  };

  uploader.onAfterAddingFile = function(/*fileItem*/) {
    //console.info(uploader.queue.length)
    // if(uploader.queue.length > 1){
    //   uploader.removeFromQueue(0);
    // }
  };

  uploader.onCompleteAll = function() {
    // if(uploader.queue.length === 1){
    //   Api.toast.success('Se guardó la foto del producto exitosamente.')
    // }else{
    //   Api.toast.success('Se guardaron las fotos del producto exitosamente.')
    // }
    Api.toast.success('Se guardó el producto exitosamente.');
    $state.go('productoUsuario');
  };

  // uploader.onSuccessItem = function(fileItem, response, status, headers) {
  //   Api.toast.success(' Se guardó la foto del producto exitosamente.')
  //   $state.go('productoUsuario');
  // };

  uploader.onErrorItem = function(/*fileItem, response, status, headers*/) {
    Api.toast.error('Hubo un error procesando la imagen.');
  };

  Api.get('api/categorias/porDepartamento')
    .then(function(result) {
      $scope.categorias = result.data.data;
    }).catch(function(err) {
      Api.toast.error('Hubo un error cargando las categorías.');
      console.error(err);
    });

  Api.get('api/subcategorias/')
    .then(function(result) {
      $scope.subcategorias = result.data.data;
    }).catch(function(err) {
      Api.toast.error('Hubo un error cargando las subcategorias.');
      console.error(err);
    });

  $scope.guardarProducto = function() {
    var mesAux = $scope.fechaVencimiento.mes + 1;
    var fechaTemporal = moment($scope.fechaVencimiento.anio + ' ' + mesAux + ' ' + $scope.fechaVencimiento.dia, "YYYY MM DD");
    if ($scope.producto.nombre && $scope.producto.descripcion && $scope.producto.categoria && $scope.producto.preciodel && $scope.producto.precioal && $scope.fechaVencimiento) {

      if (!fechaTemporal.isValid()) {
        Api.toast.warning('Fecha límite inválida.');
        return;
      }
      if (Number($scope.producto.preciodel) > Number($scope.producto.precioal)) {
        Api.toast.warning('El precio final debe ser mayor al inicial.');
        return;
      }

      if (uploader.queue.length === 0) {
        Api.toast.warning('Debes subir una foto del producto.');
        return;
      }

      $scope.producto.fechaLimite = fechaTemporal.format("YYYY-MM-DD");

      Api.post('api/productos/', {
        producto: $scope.producto
      })
      .then(function(resp) {
        //console.info(resp);
        $scope.idProducto = resp.data.data.lastInsertId;

        if (resp.data.code === 0) {
          uploader.uploadAll();
        } else {
          Api.toast.error('Hubo un error guardando el producto.');
        }
      }).catch(function(err) {
        console.error(err);
        Api.toast.error('Hubo un error guardando el producto.');
      });
    } else {
      Api.toast.warning('Completa la información necesaria del producto.');
    }
  };

});