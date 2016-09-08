
PICKNGO.factory('Api_proveedores', function ($http, Api_utils) {
  const a = {};

    // ################# GET'S #####################

   /**
   * trae la lista de proveedores
   */
  a.getProveedores = function (cb) {
    return $http.get('/api/proveedores').then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };

  a.getCategorias = function(id,cb){
    return $http.get('/api/proveedores/categorias/'+id).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });    
  }
   /**
   * trae la lista de tipos de proveedores
   */
  a.getTipos = function(cb){
    return $http.get('/api/proveedores/tipos').then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });    
  }
   /**
   * trae la lista de estados de proveedores
   */
  a.getEstados = function(cb){
    return $http.get('/api/proveedores/estados').then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });    
  }
  // ################# POST'S #####################
  /**
   * crea un nuevo proveedor
   * 
   */
  a.post = function (data, cb) {
    return $http.post('/api/proveedores/', data).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  }; 

  /**
   * le agrega una categoria a un proveedor
   * 
   */  
  a.postProveedorCategoria = function (id_proveedor,id_categoria, cb) {
    return $http.post('/api/proveedores/categoria', {id_proveedor,id_categoria}).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };  
  // ################# PUT'S #####################
  /**
   * editar un proveedor
   * 
   */
  a.put = function (data, cb) {
    return $http.put('/api/proveedores/', data).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  }; 
  // ################# DELETE'S #####################
  /**
   * quitar una categoría al proveedor
   * 
   */
  a.deleteProveedorCategoria = function (idProveedor, cb) {
    return $http.delete('/api/proveedores/categoria/'+idProveedor).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };   
  return a;
});