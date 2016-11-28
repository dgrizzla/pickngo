module.exports = function ($http, Api_utils) {
  const obj = {};
  // ################# GET'S #####################

  /**
   * trae todos los renglones
   */
  obj.getAll = function (cb) {
    return $http.get('/api/renglones/').then(
      Api_utils.proxy(cb),
      function () {
        cb(Api_utils.error);
      });
  };
  /**
   * trae los renglones dependiendo el query
   */
  obj.getSort = (order, offset, limit, asc, cb) => Api_utils.promisify(
    $http.get('/api/renglones/sort/' + order + '/' + offset + '/' + limit + '/' + asc),
    cb
  );

  /**
   * trae un renglon especifico
   * @param {number} id
   */
  obj.getOne = (id, cb) => Api_utils.promisify(
    $http.get('/api/renglones/' + id),
    cb
  );

  /**
   * trae las imagenes de un renglon especifico
   * @param {number} id
   */
  obj.getImagenes = (id, cb) => Api_utils.promisify(
    $http.get('/api/renglones/' + id + '/imagenes'),
    cb
  );
  /**
   * trae las articulos de un renglon especifico
   * @param {number} id
   */
  obj.getArticulos = (id, cb) => Api_utils.promisify(
    $http.get('/api/renglones/' + id + '/articulos'),
    cb
  );
  // ################# POST'S ####################
  /**
   * agrega un renglon
   * @param {object} data del nuevo renglon
   */
  obj.post = (data, cb) => Api_utils.promisify(
    $http.post('/api/renglones', data),
    cb
  );
  /**
   * agrega articulos a un renglon
   * @param {object} data del nuevo renglon
   */
  obj.postArticulo = (data, cb) => Api_utils.promisify(
    $http.post('/api/renglones/articulo', data),
    cb
  );

  // ################# PUT'S #####################
  /**
   * edita un renglon
   * @param {number} id
   * @param {object} data nueva version
   */
  obj.put = (id, data, cb) => Api_utils.promisify(
    $http.put('/api/renglones/' + id, data),
    cb
  );
  /**
   * edita un articulo
   * @param {number} id
   * @param {object} data nueva version
   */
  obj.putArticulo = (id, data, cb) => Api_utils.promisify(
    $http.put('/api/renglones/articulo/' + id, data),
    cb
  );
  

  // ################# DELETE'S #####################
  /**
   * elimina una imagen
   * @param {number} id
   */
  obj.deleteImagen = (id, cb) => Api_utils.promisify(
    $http.delete('/api/renglones/imagen/' + id),
    cb
  );
  /**
   * elimina un articulo
   * @param {number} id
   */
  obj.deleteArticulo = (id, cb) => Api_utils.promisify(
    $http.delete('/api/renglones/articulo/' + id),
    cb
  );

  return obj;
};
