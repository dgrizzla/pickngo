PICKNGO.factory('Api_usuarios', function ($http, Api_utils) {
  const obj = {};

  // ################# GET'S #####################

  /**
   * trae un numero de usuarios dependiendo los parametros
   * 
   * @param {string} order el nombre de la columna que se quiere ordenar
   * @param {number} offset numero desde donde ser quiere comenzar
   * @param {number} limit el limite de usuarios que se quieren
   * @param {boolean} asc se se quiere ascendente
   */
  obj.getUsuarios = function (order, offset, limit, asc, cb) {
    return $http.get('/api/usuarios/' + order + '/' + offset + '/' + limit + '/' + asc).then(
      Api_utils.proxy(cb),
      function () {
        cb(Api_utils.error);
      });
  };

  /**
   * trae usuario especifico
   * 
   * @param {number} id
   */
  obj.getUsuario = function (id, cb) {
    return $http.get('/api/usuarios/' + id).then(
      Api_utils.proxy(cb),
      function () {
        cb(Api_utils.error);
      });
  };
  // ################# PUT'S #####################
  /**
   * edita un usuario 
   */
  obj.putUsuario = function (id, data, cb) {
    return $http.put('/api/usuarios/' + id, data).then(
      Api_utils.proxy(cb),
      function () {
        cb(Api_utils.error);
      });
  };
  return obj;
});
