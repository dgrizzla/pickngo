const mysql = require("mysql");
const  config = require('./config/environment')

var pool  = mysql.createPool(config.mysql);

module.exports = function (query, data, cb) {
	pool.getConnection(function(err, connection) {
		connection.query(query, data, onQuery);
		function onQuery(err, rows) {
			if (cb){
				cb(err, rows);
			}
			connection.release();
		}
	});
}
