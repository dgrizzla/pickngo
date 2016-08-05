function generate(code, description, data) {
  return {
    code,
    description,
    data
  };
};

exports.generate = generate;

/**
 * ejecuta una funcion del modal y responde el request
 * @param {object} res respuesta
 * @param {funcion} model funcion del model a ejecutar
 * @param {array|number|string} data informacion a pasar
 */
exports.commonData = function (res, model, data) {
  model(data, function (result) {
    res.json(result);
  });
};

exports.common = function (res, model) {
  model(function (result) {
    res.json(result);
  });
};

/**
 * genera una respuesta comun con el error y la data
 * @param {object} err
 * @param {object} data
 */
exports.commonResult = function (err, data) {
  return generate(err ? 1 : 0, err, data);
};