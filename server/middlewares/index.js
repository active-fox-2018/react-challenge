const User = require('../models/User')
const Fav = require('../models/Fav')

const mongoose = require('mongoose')
const { verifyJwt } = require('../helpers')

module.exports = {
    isLogin (req, res, next) {
        if (!req.headers.token) {
            res.status(400).json({
                msg: `Please login first`
            })
        } else {
            try {
                let userId = verifyJwt(req.headers.token).id
                if (!mongoose.Types.ObjectId.isValid(userId)) {
                    res.status(400).json({
                        msg: `ID is not valid`
                    })
                } else {
                    User.findById(userId)
                        .then(found => {
                            if (!found) {
                                res.status(404).json({
                                    msg: `User not found`
                                })
                            } else {
                                req.currentUser = found
                                next()
                            }
                        })
                        .catch(err => {
                            res.status(500).json({
                                msg: err.message
                            })
                        })
                }
            } catch (err) {
                res.status(400).json({
                    msg: 'Please login first'
                })
            }
        }
    },
    authUserFav (req, res, next) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                msg: `ID is not valid`
            })
        } else {
            Fav.findById(req.params.id)
                .then(found => {
                    if (!found) {
                        res.status(404).json({
                            msg: `Fav not found`
                        })
                    } else {
                        if ( String(found.user) !== String(req.currentUser._id)) {
                            res.status(401).json({
                                msg: `You are not authorized`
                            })
                        } else {
                            req.currentFav = found
                            next()
                        }
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg: err.message
                    })
                })
        }
    }
}