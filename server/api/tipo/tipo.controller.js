/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos              ->  index
 */

'use strict';

// Gets a list of Tipos
exports.index = function (req, res) {
  res.json([]);
}
