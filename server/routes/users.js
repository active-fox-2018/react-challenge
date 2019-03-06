var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController')
const { isLogin } = require('../middlewares')

router.post('/', UserController.create)
router.get('/', isLogin, UserController.findOne)
router.post('/login', UserController.login)

module.exports = router;
