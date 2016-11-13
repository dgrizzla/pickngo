
PICKNGO.factory('Api_opciones', function ($http, Api_utils) {
  const a = {};

  // ################# GET'S #####################
   /**
   * trae un numero de opcio nes dependiendo los parametros
   * 
   * @param {string} order el nombre de la columna que se quiere ordenar
   * @param {number} offset numero desde donde ser quiere comenzar
   * @param {number} limit el limite de usuarios que se quieren
   * @param {boolean} asc se se quiere ascendente
   */
  a.getOpciones = function (order, offset, limit, asc, cb) {
    return $http.get('/api/opciones/' + order + '/' + offset + '/' + limit + '/' + asc).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };
   /**
   * trae los tipos de las opciones
   * 
   * @param {boolean} asc se se quiere ascendente
   */
  a.getTipos = function (cb) {
    return $http.get('/api/opciones/tipos').then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };

  // ################# POST'S #####################
  /**
   * crea una nueva opcion
   * 
   * @param {object} data nombre descrpcion y el tipo
   * @param {boolean} asc se se quiere ascendente
   */
  a.post = function (data, cb) {
    return $http.post('/api/opciones/', data).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };
    // ################# PUT'S #####################
  /**
   * crea una nueva opcion
   * 
   * @param {object} data nombre descrpcion y el tipo
   * @param {boolean} asc se se quiere ascendente
   */
  a.put = function (id, data, cb) {
    return $http.put('/api/opciones/' + id, data).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };
  return a;
});