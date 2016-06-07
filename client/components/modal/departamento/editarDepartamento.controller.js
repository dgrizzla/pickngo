'use strict';

angular.module('pickngoApp')
    .controller('EditarDeptoCtrl', function($scope, Auth, departamento, $http, Notification) {
        Auth.getCurrentUser();
        $scope.departamento = departamento;
        $scope.guardarDepto = function(valid) {
            if (valid) {
                $http.put('api/departamentos/', {departamento: $scope.departamento})
                    .then(resp => {
                        Notification.success('Se editó exitosamente el departamento.')
                        $scope.$close();
                    }).catch(err => {
                        Notification.error('Hubo un error editando el departamento.')
                        console.error(err)
                        $scope.$close();
                    })
            }else{
                Notification.warning('Completa los datos.')
            }
        }
    });