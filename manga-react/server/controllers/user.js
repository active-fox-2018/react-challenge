const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { comparePw } = require('../helpers/encryptPw')

module.exports = {
    register: (req, res) => {
        let newUser = { name, email, password } = req.body
        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    login: (req, res) => {
        User
            .findOne({email: req.body.email})
            .then(user => {
                if (user) {
                    if (comparePw(req.body.password, user.password)) {
                        let token = jwt.sign({
                            id: user._id,
                            name: user.name,
                            email: user.email,
                        }, process.env.JWT_SECRET)
                        res.status(200).json({access_token: token})
                    } else {
                        res.status(400).json({ msg: 'Email/password is wrong!' })
                    }
                } else {
                    res.status(400).json({ msg : 'Email/password is wrong!' })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    firebaseLogin: (req, res) => {
        User
            .findOne({email: req.body.email})
            .then((user) => {
                if (user) {
                    let payload = {
                        id: user._id,
                        email: user.email,
                        name: user.name
                        }
                    let token = jwt.sign(payload, process.env.JWT_SECRET)
                    res.status(200).json({access_token: token})
                } else {
                    let userData = {
                        name: req.body.name,
                        email: req.body.email,
                        password: 12345
                    }
                    User
                        .create(userData)
                        .then(newUser => {
                            let payload = {
                                    id: newUser._id,
                                    email: newUser.email,
                                    name: newUser.name
                                }
                            let token = jwt.sign(payload, process.env.JWT_SECRET)
                            res.status(200).json({access_token: token})
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json(err)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            });
    }
}