
PICKNGO.factory('Api_main', function ($http, Api_usuarios, Api_roles, Api_opciones) {
  const a = {};

  a.usuarios = Api_usuarios;
  a.roles = Api_roles;
  a.opciones = Api_opciones;

  return a;
});