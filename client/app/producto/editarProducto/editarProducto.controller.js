'use strict';

angular.module('pickngoApp')
  .controller('EditarProductoCtrl', function($scope, Auth, Notification, $state, $http, $stateParams, FileUploader) {
    Auth.getCurrentUser();
    console.info('nahue!', $stateParams.producto)
    var anioActual = moment().get('year');
    $scope.aniosMax = [anioActual, anioActual + 1];
    $scope.producto = $stateParams.producto;
    var fechaTempLimite = moment().format($stateParams.producto.fecha_limite)

    $scope.fechaVencimiento = {
      dia: moment(fechaTempLimite).get('date'),
      mes: moment(fechaTempLimite).get('month'),
      anio: moment(fechaTempLimite).get('year')
    }

    $scope.producto.categoria = {
      id: $stateParams.producto.id_subcat,
      nombre: $stateParams.producto.nombre_categoria,
      id_departamento: $stateParams.producto.id_cat
    };

    $http.get('api/categorias/porDepartamento')
      .then(function(result) {
        $scope.categorias = result.data.data;
      }).catch(function(err) {
        Notification.error('Hubo un error cargando las categorías.');
        console.error(err);
      })

    $http.get('api/subcategorias/')
      .then(function(result) {
        $scope.subcategorias = result.data.data
      }).catch(function(err) {
        Notification.error('Hubo un error cargando las subcategorias.');
        console.error(err)
      });

    var uploader = $scope.uploader = new FileUploader({
      url: 'components/upload/imgProducto'
    });

    uploader.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/ , options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
      Notification('Formato de archivo inválido.');
    };

    uploader.onBeforeUploadItem = function(item) {
      console.log('asdf',$scope.producto.id,$scope.producto.id_producto)
      var data = {
        idProducto: $scope.producto.id,
        c:''
      };
      item.formData.push(data);
    };

    uploader.onAfterAddingFile = function(fileItem) {
      console.info(uploader.queue.length)
      if (uploader.queue.length > 1) {
        uploader.removeFromQueue(0);
      }
    };

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      Notification.success('Se guardó la foto del producto exitosamente.')
      $state.go('productoUsuario');
    };

    uploader.onErrorItem = function(fileItem, response, status, headers) {
      Notification.error('Hubo un error procesando la imagen.')
    };

    $scope.guardarProducto = function() {
      $http.put('api/productos/',{producto: $scope.producto})
        .then(function(result){
          console.log('result put',result)
          if(result.data.code == 0){
            uploader.uploadAll();
            Notification.success('Se guardo la información del producto.');
          }
        }).catch(function(err){
          console.error(err);
        });
    }
  });