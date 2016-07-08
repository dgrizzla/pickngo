var model = require("./session.model.js"),
	passport = require('passport');

module.exports.login = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		var error = err || info;
		if (error) {
			return res.json(400, error);
		}
		if (err || !user) {
			return res.json({
				status: 'error',
				message: 'Hubo un error procesando la solicitud.'
			});
		}
		req.logIn(user, function(err) {
			if (err) {
				return res.json({
					status: 'error',
					message: 'Hubo un error procesando la solicitud.'
				});
			}
			return res.json({
				status: 'success',
				user: user
			})
		});
	})(req, res, next);
};
 
module.exports.getSession = function(req, res) {
	if (req.isAuthenticated()) {
		res.json(req.user);
	} else {
		req.user = {};
		res.json(req.user);
	}
};

module.exports.logout = function(req,res){
	if(req.user){
		req.logout();
		res.sendStatus(200);
	}else{
		res.sendStatus(400);
	}
};