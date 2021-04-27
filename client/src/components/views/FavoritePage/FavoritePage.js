import React, { useEffect, useState } from 'react'
import { IMAGE_URL } from '../../Config'
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
                alert('fail')
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
                alert('fail')
            }
        })
    }

    const listRender = Favorites.map((favorite, index) => {
        return <tr key={index}>
                <td>{favorite.moviePoster ?
                    <img src={`${IMAGE_URL}w200${favorite.moviePoster}`} /> : null}</td>
                <td>{favorite.movieTitle}</td>
                <td>{favorite.movieRunTime} mins</td>
                <td><button onClick={() => onClickRemove(favorite.movieId, favorite.userFrom)}>Remove</button></td>
               </tr>
        })

    return (
        <div className='container'>
            <table>
                <thead>
                    <tr>
                        <td>POSTER</td>
                        <td>TITLE</td>
                        <td>RUNTIME</td>
                        <td>FAVORITE</td>
                    </tr>
                </thead>
                <tbody>
                    {listRender}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
