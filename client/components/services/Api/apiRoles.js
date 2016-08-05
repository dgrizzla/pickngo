
PICKNGO.factory('Api_roles', function ($http, Api_utils, $q) {
  const a = {};

  // ################# GET'S #####################

  /**
   * trae la lista de roles 
   * 
   */
  a.getRoles = function (cb) {
    return $http.get('/api/tipos/usuario').then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };

  /**
   * trae la lista de roles 
   * 
   */
  a.getOpcionesRol = function (id, order, offset, limit, asc, cb) {
    return $http.get('/api/roles/' + id + '/' + order + '/' + offset + '/' + limit + '/' + asc).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };

  return a;
});