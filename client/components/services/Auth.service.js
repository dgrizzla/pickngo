angular.module('pickngoApp')
  .factory('Auth', function($rootScope, $q, Util, $cookies, $state, $uibModal,$http,Notification) {
    var safeCb = Util.safeCb;
    var currentUser = {};
    var Auth = {
      login({user, password}, callback) {
        return $http.post('/login', {
          user: user,
          password: password
        })
          .then(result => {
             console.log('result auth',result)
            if(result.data.status === 'success'){
              $state.go('dashboard');
            }else{
              return callback(result);
            }  
          })
          .catch(err =>{
            safeCb(callback)(err.data);
            return $q.reject(err.data);
          })
      },
      registro(usuario,callback){return $http.post('api/usuarios/registroUsuario',{usuario:usuario})
            .then(result => {
                return result;
              },function(err){
                console.log('err registro auth.js',err);
              })

      }
    };
    return Auth;
  });
