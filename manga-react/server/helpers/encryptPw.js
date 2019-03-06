const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = {
    encryptPw: function (input) {
        return bcrypt.hashSync(input, saltRounds)
    },
    comparePw: function(input, encryptedPw) {
        return bcrypt.compareSync(input, encryptedPw)
    }
}
