'use strict';

angular.module('pickngoApp')
  .controller('PanelAdminCtrl', function($scope, $http, Auth, $location, Notification,$uibModal) {
    Auth.getCurrentUser();
    
    getCategorias();
    getDepartamentos();
    getSubCategorias();
      
    function getDepartamentos() {  
      $http.get('api/departamentos/')
        .then(result => {
          $scope.departamentos = result.data.data;
        }).catch(err => {
          Notification.error('Hubo un error cargando los departamentos.')
          console.error('error deptos', err)
        });
    }
    
    function getCategorias() {
      $http.get('api/categorias/')
        .then(result => {
          $scope.categorias = result.data.data;
        }).catch(err => {
          Notification.error('Hubo un error cargando las categorías.')
          console.error('error categ', err);
        });
    }

    function getSubCategorias() {
      $http.get('api/subcategorias/')
        .then(result => {
          $scope.subcategorias = result.data.data;
        }).catch(err => {
          Notification.error('Hubo un error cargando las subcategorías.')
          console.error(err);
        });      
    }

    $scope.modalAgregar = function() {
      if($scope.tablaSelect == "1"){
        //opción para agregar departamentos
        var modalDepartamento = $uibModal.open({
            templateUrl: 'components/modal/departamento/agregarDepartamento.html',
            controller: 'AgregarDeptoCtrl',
            size: 'sm'
        });
        modalDepartamento.result.then(function() {
          getDepartamentos();
        });
      }else if($scope.tablaSelect == "2"){
        //opción para agregar categorías
        var modalCategoria = $uibModal.open({
            templateUrl: 'components/modal/categoria/agregarCategoria.html',
            controller: 'AgregarCategoriaCtrl',
            resolve:{
              departamentos: function(){
                return $scope.departamentos;     
              }
            },
            size: 'sm'
        });
        modalCategoria.result.then(function() {
          getCategorias();
        });
        
      }else if($scope.tablaSelect == "3"){
        //opción para agregar subcategorías
        var modalSubCategoria = $uibModal.open({
            templateUrl: 'components/modal/subcategoria/agregarSubCat.html',
            controller: 'AgregarSubCatCtrl',
            resolve:{
              categorias: function(){
                return $scope.categorias;     
              }
            },
            size: 'sm'
        });
        modalSubCategoria.result.then(function() {
          getSubCategorias();
        });
      }
    }
    
    $scope.editarDepartamento = function(departamento){
      var modalEditDepto = $uibModal.open({
            templateUrl: 'components/modal/departamento/agregarDepartamento.html',
            controller: 'EditarDeptoCtrl',
            resolve:{
              departamento: function(){
                return departamento;     
              }
            },
            size: 'sm'
        });
        modalEditDepto.result.then(function() {
          getDepartamentos();
        });
    };
    
    $scope.eliminarDepartamento = function (departamento) {
      var eliminarDepto = $uibModal.open({
            templateUrl: 'components/modal/confirm/confirm.html',
            controller: 'ConfirmCtrl',
            size: 'sm'
        });
        eliminarDepto.result.then(function(resp) {
          if(resp){
            $http.delete('/api/departamentos/'+departamento.id)
              .then(result=>{
                Notification.success('Se eliminó el departamento.')
                getDepartamentos();
              }).catch(err=>{
                Notification.error('Hubo un error eliminando el departamento.')
                console.error(err)
              });  
          }
          
        });
    };
    
    $scope.editarCategoria = function(categoria){
      var modalEditCat = $uibModal.open({
            templateUrl: 'components/modal/categoria/agregarCategoria.html',
            controller: 'EditarCategoriaCtrl',
            resolve:{
              departamentos: function(){
                return $scope.departamentos;     
              },
              categoria: function(){
                return categoria;
              }
            },
            size: 'sm'
        });
        modalEditCat.result.then(function() {
          getCategorias();
        });
    };
    
    $scope.eliminarCategoria = function (categoria) {
      var eliminarCat = $uibModal.open({
            templateUrl: 'components/modal/confirm/confirm.html',
            controller: 'ConfirmCtrl',
            size: 'sm'
        });
        eliminarCat.result.then(function(resp) {
          if(resp){
            $http.delete('/api/categorias/'+categoria.id_categoria)
              .then(result=>{
                Notification.success('Se eliminó la categoría.');
                getCategorias();
              }).catch(err=>{
                Notification.error('Hubo un error eliminando la categoría.');
                console.error(err)
              });  
          }
          
        });
    };
    
    $scope.editarSubCategoria = function(subcategoria){
      console.log('subcat!',subcategoria);
      var modalEditSubCat = $uibModal.open({
            templateUrl: 'components/modal/subcategoria/agregarSubCat.html',
            controller: 'EditarSubCatCtrl',
            resolve:{
              categorias: function(){
                return $scope.categorias;     
              },
              subcategoria: function(){
                return subcategoria;
              }
            },
            size: 'sm'
        });
        modalEditSubCat.result.then(function() {
          getSubCategorias();
        });
    };
    
    $scope.eliminarSubCategoria = function (subcategoria) {
      var eliminarSubCat = $uibModal.open({
            templateUrl: 'components/modal/confirm/confirm.html',
            controller: 'ConfirmCtrl',
            size: 'sm'
        });
        eliminarSubCat.result.then(function(resp) {
          if(resp){
            $http.delete('api/subcategorias/'+subcategoria.id)
              .then(result=>{
                Notification.success('Se eliminó la subcategoría.');
                getSubCategorias();
              }).catch(err=>{
                Notification.error('Hubo un error eliminando la subcategoría.');
                console.error(err)
              });  
          }
          
        });
    };
  });