'use strict';

angular.module('pickngoApp')
    .controller('EditarCategoriaCtrl', function($scope, Auth, departamentos, categoria, $http, Notification) {
        Auth.getCurrentUser();
        $scope.categoria = {id: categoria.id_categoria, nombre:categoria.nombre_categoria, departamento:categoria.id_cat};
        $scope.departamentos = departamentos;
        $scope.guardarCategoria = function(valid) {
            if (valid) {
                $http.put('api/categorias/', {categoria: $scope.categoria})
                    .then(resp => {
                        Notification.success('Se editó exitosamente la categoría.')
                        $scope.$close();
                    }).catch(err => {
                        Notification.error('Hubo un error editando la categoría.')
                        console.error(err)
                        $scope.$close();
                    })
            }else{
            Notification.warning('Completa los datos.')
            }
        }
    });