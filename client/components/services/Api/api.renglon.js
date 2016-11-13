

module.exports = function ($http, Api_utils) {
  const obj = {};
  // ################# GET'S #####################

  /**
   * trae todos los renglones
   */
  obj.getAll = function (cb) {
    return $http.get('/api/renglon/').then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };

  /**
   * trae un renglon especifico
   * @param {number} id
   */
  obj.getOne = function (id, cb) {
    return $http.get('/api/renglon/' + id).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };
  // ################# POST'S ####################
  /**
   * agrega un renglon
   * @param {object} data del nuevo renglon
   */
  obj.post = (data, cb) => Api_utils.promisify(
    $http.post('/api/renglon', data),
    cb
  );

  // ################# PUT'S #####################
  /**
   * edita un renglon
   * @param {number} id
   * @param {object} data nueva version
   */
  obj.put = function (id, data, cb) {
    return $http.put('/api/renglon/' + id, data).then(
      Api_utils.proxy(cb),
      function () {
      cb(Api_utils.error);
    });
  };

  return obj
};