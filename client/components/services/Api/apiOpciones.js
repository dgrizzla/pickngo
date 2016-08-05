
PICKNGO.factory('Api_opciones', function ($http, Api_utils, $q) {
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

  return a;
});