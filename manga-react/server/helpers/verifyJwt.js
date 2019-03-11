const jwt = require('jsonwebtoken')

function verifyJwt(req, res) {
    try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        req.authUser = decoded
    } catch (error) {
        res.status(400).json({msg: `Please Log In First!`})
    }
}

module.exports = verifyJwt