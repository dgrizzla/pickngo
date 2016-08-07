
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
   * @param {string} order el nombre de la columna que se quiere ordenar
   * @param {number} offset numero desde donde ser quiere comenzar
   * @param {number} limit el limite de usuarios que se quieren
   * @param {boolean} asc se se quiere ascendente
   */
  a.getOpcionesRol = function (id, order, offset, limit, asc, cb) {
    return $http.get('/api/roles/' + id + '/' + order + '/' + offset + '/' + limit + '/' + asc).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };


  // ################# POST'S #####################
  /**
   * agrega una opcion a un roles
   * @param {number} id_rol
   * @param {number} id_opcion
   */
  a.postRolOpcion = function (id_rol, id_opcion, cb) {
    return $http.post('/api/roles/opcion', { id_rol, id_opcion }).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };
  /**
   * agrega un nuevo rol
   * @param {number} nombre
   * @param {number} descripcion
   */
  a.postRol = function (nombre, descripcion, cb) {
    return $http.post('/api/roles/', { nombre, descripcion }).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };

  // ################# DELETE'S #####################
  /**
   * elimina una opcion del rol
   * @param {number} id_rol_opcion
   */
  a.deleteRolOpcion = function (id_rol_opcion, cb) {
    return $http.delete('/api/roles/opcion/' + id_rol_opcion ).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };

    // ################# PUT'S #####################
  /**
   * edita un rol 
   * @param {number} id id del rol (tipo)
   * @param {string} nombre
   * @param {string} descripcion
   */
  a.putRol = function (id, nombre, descripcion, cb) {
    return $http.put('/api/roles/' + id, {nombre, descripcion}).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };
  return a;
});