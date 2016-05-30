angular.module('pickngoApp')
    .run(function($rootScope, $location, Auth) {
        console.log('angular run');
        $rootScope.$on('event:auth-loginRequired', function() {
            if ($location.$$path !== '/') {
                if ($rootScope.currentUser && $rootScope.currentUser.usuario)
                    $location.path('/dashboard');
                else {
                    $location.path('/');
                }
            }
            return false;
        });
    });