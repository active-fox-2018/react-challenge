const Manga = require('../models/Manga')
const ObjectId = require('mongoose').Types.ObjectId
module.exports = {
    checkUniqueManga: (req, res, next) => {
        Manga
            .findOne({id: req.body.id, userId: ObjectId(req.current_user._id)})
            .then((result) => {
                result ? res.status(400).json({msg: 'Already Favourite This Manga'}) : next()
                console.log(result)
            })
            .catch((err) => {
                console.log(err)    
            });

    }
}