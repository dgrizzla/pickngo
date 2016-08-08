
PICKNGO.factory('Api_main', function ($http, Api_usuarios, Api_roles, Api_opciones, Api_utils) {
  const a = {};

  a.usuarios = Api_usuarios;
  a.roles = Api_roles;
  a.opciones = Api_opciones;

    // ################# GET'S #####################

   /**
   * trae la lista de paises
   */
  a.getPaises = function (cb) {
    return $http.get('/api/paises').then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };
  return a;
});