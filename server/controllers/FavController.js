const Fav = require('../models/Fav')
const User = require('../models/User')

class FavController {
    static create (req, res) {
        Fav.create({
            user: req.currentUser._id,
            anime: req.body.anime
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
    }

    static getMy (req, res) {
        Fav.find({
            user: req.currentUser._id
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
    }

    static findOne (req, res) {
        res.status(200).json(req.currentFav)
    }

    static deleteOne (req, res) {
        req.currentFav.remove()
            .then(data => {
                return User.findByIdAndUpdate(req.currentUser._id, { $pull: { fav: req.currentFav._id } }, {new: true}).populate('anime').execPopulate()
            })
            .then(populated => {
                res.status(200).json(populated)
            })
            .catch(err => {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}

module.exports = FavController