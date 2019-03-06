const jwt = require('jsonwebtoken')

function verifyJwt(req, res) {
    if(!req.headers.token) {
        res.status(400).json({msg: `You're Not Authorized, Please Log In / Register First!`})
    } else {
        try {
            const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            req.authUser = decoded
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = verifyJwt