var express = require('express');
var router = express.Router();
const FavController = require('../controllers/FavController')
const { isLogin, authUserFav } = require('../middlewares')

router.use(isLogin)
router.post('/', FavController.create)
router.get('/', FavController.getMy)
router.get('/:id', authUserFav, FavController.findOne)
router.delete('/:id', authUserFav, FavController.deleteOne)

module.exports = router;
