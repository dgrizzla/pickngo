const model = require('./model.js');
const response = require('../components/utils/response.js');

exports.getPaises = function (req, res) {
  response.common(res, model.getPaises);
};

exports.getTableCount = function (req, res) {
  response.commonData(
    res,
    model.getTableCount,
    req.params.table
  );
};