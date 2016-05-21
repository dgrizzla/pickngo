'use strict';

function resp(code, description, data){
  return {'code' : code,'description' : description,'data' : data};
}

resp.generate = function () {
  return resp.apply(null,arguments);
};

module.exports = resp;
