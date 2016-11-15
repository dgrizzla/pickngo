
PICKNGO.factory('Api_utils', function () {
  const newError = error => ({code: 1, description: error});
  const error = {code: 1, description: 'A ocurrido un error'};
  const obj = {error};

  obj.proxy = function (cb) {
    return function (response) {
      return cb(response.data);
    };
  };
  const isResponse = response => 'code' in response || 'data' in response || 'description' in response ;

  obj.promisify = function (promise, cb) {
    if (!cb) {
      return promise
        .then(response => {
          response = response.data;
          if (!isResponse(response)) {
            return response;
          }
          if (response.code !== 0) {
            throw new Error(response.description);
          }
          return response.data;
        });
    }
    promise
      .then(response => response.data)
      .then(cb)
      .catch(error => cb(newError(error)));
  };
  return obj;
});