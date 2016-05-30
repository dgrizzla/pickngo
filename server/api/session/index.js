var  express = require("express"),
     router = express.Router(),
     controller = require('./session.controller.js');


router.post('/login' , controller.login);
router.get('/session',controller.getSession);
router.delete('/logout',controller.logout);

module.exports = router;