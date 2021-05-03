const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoriteSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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
    },
    favoriteCount: {
        type: Number, 'default': 0
    },
    timestamps: {
        type: Date, 'default': Date.now 
    }
})

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = { Favorite }