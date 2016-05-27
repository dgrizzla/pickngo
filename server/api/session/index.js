var  express = require("express"),
     router = express.Router(),
     controller = require('./session.controller.js');

//router.get('/session', controller.session);
router.post('/login' , controller.login);
//router.get('/logout', controller.logout);

module.exports = router;