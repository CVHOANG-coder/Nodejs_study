const express = require('express');
const controller = require('../controllers/auth-controllers')
// const validate = require('../validate/auth-validate');
var router = express.Router();

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;
