const noop = function () {};
PICKNGO.factory('Auth', function($rootScope, Util, $state, Session, Api) {
  var safeCb = Util.safeCb;
  // var currentUser = {};
  function getCurrentUser(callback = noop) {
    Session.get(function(result) {
      $rootScope.currentUser = result.data;
      callback(result.data);
    });
  }
  Api.getCurrentUser = getCurrentUser;
  var Auth = {
    login({
      user,
      password
    }, callback) {
      return Api.post('/auth/login', {
        user: user,
        password: password
      })
      .then(result => {
        if (result.data.status === 'success') {
          $rootScope.usuarioActual;
          $state.go('dashboard');
        } else {
          return callback(result);
        }
      })
      .catch(err => {
        safeCb(callback)(err.data);
      });
    },
    registro(usuario/*, callback*/) {
      return Api.post('api/usuarios/registroUsuario', {
        usuario: usuario
      })
      .then(result => {
        return result;
      }, function(err) {
        console.log('err registro auth.js', err);
      });

    },
    getCurrentUser,
    logout(callback) {
      Session.delete(function(/*resp*/) {
        $rootScope.currentUser = null;
        return safeCb(callback)({});
      }, function(err) {
        console.error('err logout', err);
        safeCb(callback)(err);
        return {
          err: err
        };
      });
    }
  };
  return Auth;
});