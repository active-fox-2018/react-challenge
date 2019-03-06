const Manga = require('../models/Manga')

module.exports = {
    createManga: (req, res) => {
        console.log(req.body)
        let data = {title} = req.body
        Manga
            .create(data)
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err)  
            })
    }
}