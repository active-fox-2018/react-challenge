var express = require('express');
var router = express.Router();
const { register, login } = require('../controllers/user')
const manga = require('./manga')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/mangas', manga)
router.post('/register', register)
router.post('/login', login)

module.exports = router;
