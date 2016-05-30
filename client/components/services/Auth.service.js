angular.module('pickngoApp')
  .factory('Auth', function($rootScope, $q, Util, $cookieStore, $state, Session, $uibModal, $http, Notification) {
    var safeCb = Util.safeCb;
    var currentUser = {};

    var Auth = {
      login({
        user,
        password
      }, callback) {
        return $http.post('/auth/login', {
            user: user,
            password: password
          })
          .then(result => {
            console.log('result auth', result)
            if (result.data.status === 'success') {
              $rootScope.usuarioActual
              $state.go('dashboard');
            } else {
              return callback(result);
            }
          })
          .catch(err => {
            safeCb(callback)(err.data);
            return $q.reject(err.data);
          })
      },
      registro(usuario, callback) {
        return $http.post('api/usuarios/registroUsuario', {
            usuario: usuario
          })
          .then(result => {
            return result;
          }, function(err) {
            console.log('err registro auth.js', err);
          })

      },
      getCurrentUser(callback) {
        Session.get(function(resp) {
          $rootScope.currentUser = resp.data;
        });
      },
      logout(callback) {
        Session.delete(function(resp) {
          $rootScope.currentUser = null;
          return safeCb(callback)({});
        }, function(err) {
          console.error('err logout', err);
          safeCb(callback)(err)
          return {
            err: err
          };
        });
      }
    };
    return Auth;
  });