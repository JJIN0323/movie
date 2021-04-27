const express = require('express')
const router = express.Router()
const { Favorite } = require('../models/Favorite')

router.post('/count', (req, res) => {

    // MongoDB에서 favorite 카운트 가져옴
    Favorite.find({'movieId': req.body.movieId})
    .exec(( err, info ) => { // 쿼리 시작
        if (err) return res.status(400).send(err)

         // 성공했다면, front에 다시 보내줌
        res.status(200).json({
            success: true,
            count: info.length
        })
    }) 
})

router.post('/counted', (req, res) => {

    // 나의 Favorite List에 있는지 DB에서 확인
    Favorite.find({'movieId': req.body.movieId, 'userFrom': req.body.userFrom})
    .exec(( err, info ) => {
        if (err) return res.status(400).send(err)

        let result = false
        if(info.length !== 0) {
            result = true
        }

        // 성공했다면, front에 다시 보내줌
        res.status(200).json({
            success: true,
            counted: result
        })
    }) 
})

router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, doc) => {
        if(err) return res.status(400).send(err)
            //console.log('Remove ', doc)
        return res.status(200).json({
            success: true, doc
        })
    })
})

router.post('/addToFavorite', (req, res) => {

    // Favorite model에 있는 정보를 넣고 저장해줌
    const addFavorite = new Favorite(req.body)
    addFavorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
            //console.log('Add ', doc)
        return res.status(200).json({
            success: true, doc
        })
    })
})

router.post('/getFavoriteList', (req, res) => {

    Favorite.find({'userFrom': req.body.userFrom})
    .exec((err, favorites) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({
            success: true,
            favorites
        })
    })
})

router.post('/removeFavoriteList', (req, res) => {

    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, result)=> {
        if (err) return res.status(400).send(err)
        return res.status(200).json({
            success: true
        })
    })
})

module.exports = router
