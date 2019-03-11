const mongoose = require('mongoose')
const Schema = mongoose.Schema
const axios = require('axios')

const mangaSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    id: Number,
    title: String,
    canonicalTitle: String,
    image: String,
    rating: Number,
    start: String,
    synopsis: String
})

mangaSchema.pre('save', async function(next) {
    try {
        let fetch = await axios({
            url: `https://kitsu.io/api/edge/manga?filter[text]=${this.title}`,
            method: 'get'
        })
        let data = fetch.data.data
        if(data.length > 0) {
            this.id = data[0].id
            this.canonicalTitle = data[0].attributes.canonicalTitle
            this.rating = Number(data[0].attributes.averageRating)
            this.synopsis = data[0].attributes.synopsis
            this.image = data[0].attributes.posterImage.tiny
            this.start = data[0].attributes.startDate
        } else {
            this.canonicalTitle = '-'
            this.averageRating = '-'
            this.synopsis = '-'
        }
        next()
    } catch (error) {
        return false
    }
})

const Manga = mongoose.model('Manga', mangaSchema)

module.exports = Manga