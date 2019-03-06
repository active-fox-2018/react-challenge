const { encryptPw } = require('../helpers/encryptPw') 

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name Cannot be Empty!'],
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(email) {
                return User.findOne({email : email, _id: {$ne: this._id}})
                    .then(user => {
                        if(user) throw 'Email has been used'
                    })
                    .catch(err => {
                        throw err
                    })
            }
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email format is incorrect'],
    },
    password: {
        type: String,
        required: [true, 'Password Cannot be Empty!'],
    }
})

userSchema.pre('save', function(next) {
    this.password = encryptPw(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User