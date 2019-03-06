const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User  = require('./User')

var favSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User required']
    },
    anime: {
        type: Object
    }
}, {
    timestamps: true
})

favSchema.post('save', function (doc, next) {
    User.findByIdAndUpdate(doc.user, { $push: { fav: doc._id } })
        .then(() => {
            next();
        })
})

var Fav = mongoose.model('Fav', favSchema)
module.exports = Fav