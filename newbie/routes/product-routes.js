const express = require('express');
const controller = require('../controllers/product-controllers')
// const authMiddlewares = require('../middlewares/auth-middlewares');
var router = express.Router();

router.get('/', controller.showProduct);

// router.get('/search', controller.search);

module.exports = router;
