angular.module('pickngoApp')
  .factory('Auth', function($rootScope, $uibModal,$http) {
    var Auth = {
      login({user, password}, callback) {return $http.post('api/usuarios/login', {user: user,password: password})
          .then(result => {
            //safeCb(callback)(null, user);
            return result;
          })
          .catch(err => {
            return err;
          });
      },
      registro(usuario,callback){return $http.post('api/usuarios  /registroUsuario',{usuario:usuario})
            .then(result => {
                return result;
              },function(err){
                console.log('err registro auth.js',err);
              })

      }
    };
    return Auth;
  });
