
PICKNGO.factory('Api_main', function ($http, Api_usuarios, Api_roles, Api_opciones, Api_utils, Api_proveedores) {
  const obj = {};

  obj.get = $http.get;
  obj.post = $http.post;
  obj.put = $http.put;
  obj.delete = $http.delete;

  obj.usuarios = Api_usuarios;
  obj.roles = Api_roles;
  obj.opciones = Api_opciones;
  obj.proveedores = Api_proveedores;

  obj.renglones = require('./api.renglon.js')($http, Api_utils);
  obj.categorias = require('./api.categoria.js')($http, Api_utils);

    // ################# GET'S #####################
  obj.count = (table, cb) => Api_utils.promisify(
    $http.get('/api/table/' + table + '/count'),
    cb
  );
   /**
   * trae la lista de paises
   */
  obj.getPaises = function (cb) {
    return $http.get('/api/paises').then(
      Api_utils.proxy(cb),
      function () {
        cb(Api_utils.error);
      });
  };
  return obj;
});