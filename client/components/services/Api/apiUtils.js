
PICKNGO.factory('Api_utils', function ($http) {
  const newError = error => ({code : 1, description : error});
  const error = {code : 1, description :'A ocurrido un error'};
  const obj = {error};

  obj.proxy = function (cb) {
    return function (response) {
      return cb(response.data);
    };
  };
  obj.promisify = function (promise, cb) {
    if (!cb) {
      return promise
        .then(response => response.data)
        .then(result => {
          if (result.code !== 0) {
            throw new Error(result);
          }
          return result;
        });
    }
    promise
      .then(response => response.data)
      .then(cb)
      .catch(result => cb(newError(error)));
  };
  return obj;
});