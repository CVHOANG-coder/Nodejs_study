const express = require('express');
const controller = require('../controllers/transfer-controller')
// const validate = require('../validate/auth-validate');
var router = express.Router();

router.get('/create', controller.createTransfer);

router.post('/create', controller.postTransfer);


module.exports = router;
