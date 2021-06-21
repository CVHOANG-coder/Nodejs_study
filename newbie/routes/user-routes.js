const express = require('express');
const multer  = require('multer');
const controller = require('../controllers/user-controllers')
const validate = require('../validate/user-validate');
const authMiddlewares = require('../middlewares/auth-middlewares');
var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  var upload = multer({ storage: storage })

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.getViewUser);

router.post('/create',
    upload.single('avatar'),
    validate.postCreate, 
    controller.postCreate
);

router.post('/delete', controller.delUser);
module.exports = router;
