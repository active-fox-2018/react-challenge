var express = require('express');
var router = express.Router();
const { register, login, firebaseLogin } = require('../controllers/user')
const { authUser } = require('../middlewares/authorization')
const manga = require('./manga')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/mangas', authUser, manga)
router.post('/register', register)
router.post('/login', login)
router.post('/firebase-login', firebaseLogin)

module.exports = router;
