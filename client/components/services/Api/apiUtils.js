
PICKNGO.factory('Api_utils', function ($http) {
  const a = {};
  a.error = {code : 1, description :'A ocurrido un error'};
  a.proxy = function (cb) {
    return function (response) {
      return cb(response.data);
    };
  };
  return a;
});