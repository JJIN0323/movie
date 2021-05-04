import React, { useEffect, useState } from 'react'
import { IMAGE_URL } from '../../Config'
import { Row, Col } from 'antd'
import axios from 'axios'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        
        FavoritedList()

    }, [])

    const FavoritedList = () => {
        axios.post('/api/favorite/getFavoriteList', { userFrom: localStorage.getItem('userId')})
        .then(response => {
            if (response.data.success) {
                //console.log(response.data)
                setFavorites(response.data.favorites)
            } else {
                alert('List Loading Fail.')
            }
        })
    }

    const onClickRemove = (movieId, userFrom) => {
        const info = {
            movieId,
            userFrom
        }

        axios.post('/api/favorite/removeFavoriteList', info)
        .then(response => {
            if (response.data.success) {
                FavoritedList() // 다시 한번 불러와서 리프레시 시키는 방법.
                                // 이것보다는 id값을 찾아서 지워주는게 효율적
            } else {
                alert('Remove Fail.')
            }
        })
    }

    const listRender = Favorites.map((favorite, index) => {
        return (
        <Col xl={6} lg={8} md={12} xs={24} key={index}>
            <div className='favoriteItem'>
                <a href={`/movie/${favorite.movieId}`}>
                    {favorite.moviePoster ?
                    <img src={`${IMAGE_URL}w400${favorite.moviePoster}`} alt={favorite.movieTitle} /> : null}
                </a>
                    <p className='title'>{favorite.movieTitle}</p>
                    <p>Runtime : {favorite.movieRunTime} mins</p>
                    <button className='yellowButton' onClick={() => onClickRemove(favorite.movieId, favorite.userFrom)}>Remove</button>
            </div>
           </Col>
           )
        })

    return (
        <div className='container'>
            <p className='subject'>Favorite List</p>
            <Row className='paddingTop'>
                {listRender}
            </Row>
        </div>
    )
}

export default FavoritePage
