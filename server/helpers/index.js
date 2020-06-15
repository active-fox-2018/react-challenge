const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')

module.exports = {
    genPass (input) {
        return bcrypt.hashSync(input, salt)
    },
    comparePass (input, pass) {
        return bcrypt.compareSync(input, pass)
    },
    verifyJwt (token) {
        return jwt.verify(token, process.env.JWT)
    }
}