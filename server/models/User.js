const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPW } = require('../helpers/bcrypt')

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email cant be empty'],
    validate: [
      {
        validator: function (value) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
        },
        msg: "invalid email format"
      },
      {
        isAsync: true,
        validator: (value, callback) => {
          User
            .findOne({
              email: value
            })
            .then(user => {

              if (user) {
                callback(false)
              } else {
                callback(true)
              }
            })
            .catch(err => {
              console.log(err)
            })
        },
        message: "this email is taken. please use another email."
      }
    ]
  },
  password: {
    type: String,
    required: [true, 'password cant be empty'],
    minlength: [6, "password must be at least 6 character long"]
  },
  source: {
    type: String, 
    default: 'manual'
  },
  WatchList: [{
    id: String,
    title: String,
    description: String,
    director: String,
    producer: String,
    release_date: String,
    rt_score: String,
    poster: String
  }],
  hookEnabled: {
    type: Boolean,
    default: true
  }
})

UserSchema.pre('save', function (next) {
  self = this
  if(self.hookEnabled){
    this.password = hashPW(this)
    next()
  } else{
    next()
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User