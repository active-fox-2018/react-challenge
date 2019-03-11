const { comparePW } = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jwt')
const User = require('../models/User')

class UserController {
  static register(req, res, next) {
    var payload

    User
      .create({
        email: req.body.email,
        password: req.body.password,
        source: 'manual'
      })
      .then(user => {
        payload = {
          _id: user._id,
          email: user.email,
        }

        res
          .status(201)
          .json({
            msg: "registration success",
            data: payload,
            token: jwtSign(payload),
          })

      })
      .catch(err => {
        res
          .status(400)
          .json({
            message: "registration fail",
            err
          })
      })
  }

  static login(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          if (comparePW(req.body.password, user.password)) {
            var userInfo = {
              _id: user._id,
              email: user.email
            }

            res
              .status(200)
              .json({
                message: "sign in success",
                data: userInfo,
                token: jwtSign(userInfo)
              })
          } else {
            res
              .status(404)
              .json({
                message: "email/password not found"
              })
          }
        } else {
          res
            .status(404)
            .json({
              message: "email not registered"
            })
        }
      })
      .catch(err => {
        res
          .status(400)
          .json({
            message: "Login failed",
            err
          })
      })
  }

  static findById(req, res) {
    User
      .findById(req.user.id)
      .then(user => {
        res
          .status(200)
          .json({
            msg: 'feth success',
            data: user
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: 'fetch fail',
            err
          })
      })
  }

  static addToWatchList(req, res) {
    User
      .findById(req.user.id)
      .then(user => {
        user.WatchList.push(req.body.movie)
        user.hookEnabled = false
        return user.save({ validateBeforeSave: false })
      })
      .then(updatedUser => {
        res
          .status(200)
          .json({
            msg: 'add to watchlists success',
            data: updatedUser
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: 'Add to watchlist fail',
            err
          })
      })

  }

  static removeFromWatchList(req, res) {
    User
      .findById(req.user.id)
      .then(user => {
        user.WatchList = user.WatchList.filter(film => film.id !== req.params.movieId)
        user.hookEnabled = false
        return user.save({ validateBeforeSave: false })
      })
      .then(updatedUser => {
        res
          .status(200)
          .json({
            msg: 'remove from watchlists success',
            data: updatedUser
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            msg: 'remove from watchlist fail',
            err
          })
      })
  }

  static authToken(req, res) {
    res
      .status(200)
      .json({
        msg: 'auth token success',
        data: req.user.email
      })
  }
}

module.exports = UserController