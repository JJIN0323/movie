const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId, // objectID로 아래 정보를 가져옴
        ref: 'User' // User에 있는 정보를 불러옴
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePoster: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, { timestamps: true })

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = { Favorite }