const Manga = require('../models/Manga')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    createUserManga: (req, res) => {
        let data = {title} = req.body
        data.userId = req.current_user._id
        Manga
            .create(data)
            .then((result) => {
                res.status(201).json(result)
            })
            .catch((err) => {
                res.status(500).json(err)
                console.log(err, '==========')  
            })
    },
    getOneManga: (req, res) => {
        console.log(req.params.id)
        Manga
            .findById(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({
                    msg: 'internal server error',
                    err
                })
            });
    },
    getAllUserManga: (req, res) => {
        Manga
            .find({userId: ObjectId(req.current_user._id)})
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({
                    msg: 'internal server error',
                })
            });
    },
    deleteUserManga: (req, res) => {
        Manga
            .findByIdAndDelete(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json({
                    msg: 'internal server error',
                })
            });
    }
}