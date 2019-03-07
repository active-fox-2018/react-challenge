var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController')
const { isLogin } = require('../middlewares')

router.post('/', UserController.create)
router.post('/login', UserController.login)
router.post('/gooSign', UserController.gooSign)
router.get('/', isLogin, UserController.findOne)
module.exports = router;
