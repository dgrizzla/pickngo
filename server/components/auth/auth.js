
//funcion para validar si el usuario esta loggeado
exports.loggedIn = function loggedIn(req, res, next) {
  if (req.isAuthenticated()) { 
    return next();
  }
  res.sendStatus(401);
};
