
module.exports = function ($http, Api_utils) {
  const obj = {};
  // ################# GET'S #####################
  /**
   * trae todos los renglones
   */
  obj.getAll = cb => Api_utils.promisify(
    $http.get('api/categorias/porDepartamento'),
    cb
  );
  return obj;
};