const express = require('express');
const controller = require('../controllers/cart-controllers')
// const validate = require('../validate/auth-validate');
var router = express.Router();

router.get('/add/:productId', controller.addToCart);


module.exports = router;
