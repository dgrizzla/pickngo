'use strict';

PICKNGO.controller('EditarProductoCtrl', function($scope, Auth, Notification, $state, $http, $stateParams, FileUploader) {
    Auth.getCurrentUser();
    var anioActual = moment().get('year');
    $scope.aniosMax = [anioActual, anioActual + 1];
    $scope.producto = $stateParams.producto;
    var fechaTempLimite = moment().format($stateParams.producto.fecha_limite)
    getImgsProducto();
    
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

    $scope.doTheBack = function() {
      window.history.back();
    };
    function getImgsProducto() {
      $http.get('api/productos/imagenesProducto/'+$scope.producto.id)
        .then(result=>{
          $scope.imagenes = result.data.data;
        }).catch(err=>{
          Notification.error('Hubo un error cargando las imagenes del producto.')
          console.error(err);
        });
    }

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


    //********---- Empieza uploader de las imagenes nuevas del producto --------***********
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
      var data = {
        idProducto: $scope.producto.id
      };
      item.formData.push(data);
    };

    uploader.onAfterAddingFile = function(fileItem) {
      // console.info(uploader.queue.length)
      // if (uploader.queue.length > 1) {
      //   uploader.removeFromQueue(0);
      // }
    };

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      //Notification.success('Se guardó la foto del producto exitosamente.')
      $state.go('productoUsuario');
      return;
    };

    uploader.onErrorItem = function(fileItem, response, status, headers) {
      Notification.error('Hubo un error procesando la imagen.')
    };

    //********---- Termina uploader de las imagenes del producto --------***********


    //********---- Empieza uploader de la imagen destacada --------***********
    var uploaderDestacada = $scope.uploaderDestacada = new FileUploader({
      url: 'components/upload/imgProducto'
    });

    uploaderDestacada.filters.push({
      name: 'imageFilter',
      fn: function(item /*{File|FileLikeObject}*/ , options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    uploaderDestacada.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
      Notification('Formato de archivo inválido.');
    };

    uploaderDestacada.onBeforeUploadItem = function(item) {
      var data = {
        idProducto: $scope.producto.id,
        aux: -1
      };
      item.formData.push(data);
    };

    uploaderDestacada.onAfterAddingFile = function(fileItem) {
      if (uploaderDestacada.queue.length > 1) {
        uploaderDestacada.removeFromQueue(0);
      }
      uploaderDestacada.uploadAll();
    };

    uploaderDestacada.onSuccessItem = function(fileItem, response, status, headers) {
      Notification.success('Se guardó la foto del producto exitosamente.')
      getImgsProducto();
      //return;
    };

    uploaderDestacada.onErrorItem = function(fileItem, response, status, headers) {
      Notification.error('Hubo un error procesando la imagen.')
    };

    //********---- Termina uploader de la imagen destacada --------***********

    $scope.guardarProducto = function() {
      var mesAux = $scope.fechaVencimiento.mes + 1;
      //fix moment
      var fechaTemporal = moment($scope.fechaVencimiento.anio + ' ' + mesAux + ' ' + $scope.fechaVencimiento.dia, "YYYY MM DD");
      
      if ($scope.producto.producto && $scope.producto.descripcion && $scope.producto.categoria && $scope.producto.precio_del && $scope.producto.precio_al && $scope.fechaVencimiento) {
        
        if (!fechaTemporal.isValid()) {
          Notification.warning('Fecha límite inválida.');
          return;
        }
        if ($scope.producto.preciodel > $scope.producto.precioal) {
          Notification.warning('El precio final debe ser mayor al inicial.')
          return;
        }

        // if(uploader.queue.length == 0){
        //   Notification.warning('Debes subir una foto del producto.')
        //   return;
        // }

        $http.put('api/productos/',{producto: $scope.producto})
          .then(function(result){
            //console.log('result put',result)
            if(result.data.code == 0){
              if(uploader.queue.length != 0){
                uploader.uploadAll();
              }
              $state.go('productoUsuario');
              Notification.success('Se guardo la información del producto.');
            }
          }).catch(function(err){
            console.error(err);
          });
      }else{
        Notification.warning('Completa la información del producto.')
      }
    }
  });