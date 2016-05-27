var model = require("./session.model.js"),
			passport = require('passport');

module.exports.login = function (req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		var error = err || info;
		if (error) {
        	return res.json(400, error);
      	}
		console.log('local pass',info,err,user)
		if (err || !user) {
			return res.json({
				status : 'error',
				message : 'Hubo un error procesando la solicitud.'
			});
		}
		req.logIn(user, function(err) {
			if (err) {
				return res.json({
					status : 'error',
					message : 'Hubo un error procesando la solicitud.'
				});
			}
			return res.json({status:'success'})
		});
  })(req, res, next);
};