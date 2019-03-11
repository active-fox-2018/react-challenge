const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const TrailerController = require('../controllers/TrailerController')
const isLogin = require('../middlewares/isLogin')

router.get('/', (req, res) => {
  res.send('success get basic route')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/user', isLogin, UserController.findById)
router.get('/authToken', isLogin, UserController.authToken)
router.get('/trailer/:movie', TrailerController.findByName)
router.put('/addToWatchlist', isLogin, UserController.addToWatchList)
router.put('/removeFromWatchlist/:movieId', isLogin, UserController.removeFromWatchList)

module.exports = router