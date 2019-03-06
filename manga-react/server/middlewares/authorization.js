const User = require('../models/User')
const verifyJwt = require('../helpers/verifyJwt')

module.exports = {
    authUser: (req, res, next) => {
        verifyJwt(req, res)
        User
            .findById(req.authUser.id)
            .then((result) => {
                if(result) req.current_user = result 
                next()
            }).catch((err) => {
                res.status(400).json({msg: `You're Not Authorized, Please Log In / Register First!`})
            });
    },
}