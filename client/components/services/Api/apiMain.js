
PICKNGO.factory('Api_main', function ($http, Api_usuarios) {
  const a = {};

  a.usuarios = Api_usuarios;

  return a;
});