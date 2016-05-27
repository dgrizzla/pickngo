import User from '../../api/usuario/usuario.model'

exports.isAuthenticated = function (req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/login");
    }
}

exports.userExist = function(req, res, next) {
    User.validaUsuarioExistente(req.body.usuario,function (resp) {
       console.log('usuario existe authserver passport',resp);
    });
    // User.count({
    //     email: req.body.email
    // }, function (err, count) {
    //     if (count === 0) {
    //         next();
    //     } else {
    //         res.redirect("/signup");
    //     }
    // });
}