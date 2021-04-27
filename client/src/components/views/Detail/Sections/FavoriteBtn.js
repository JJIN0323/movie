import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Icon, Popover } from 'antd'

function FavoriteBtn(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePoster = props.movieInfo.poster_path
    const movieRunTime = props.movieInfo.runtime
    
    const [Count, setCount] = useState(0)
    const [Counted, setCounted] = useState(false)

    //console.log(movieId, userFrom)

    let info = { // Favorite Schema에서 가져올 정보들
        userFrom,
        movieId,
        movieTitle,
        moviePoster,
        movieRunTime
    }

    useEffect(() => {
        
        axios.post('/api/favorite/count', info)
        .then(response => {
            //console.log('Count ',response.data)
            if (response.data.success) {
                setCount(response.data.count)
            } else {
                alert('Favorite count failure')
            }
        })

        axios.post('/api/favorite/counted', info)
        .then(response => {
            //console.log('Counted ',response.data)
            if (response.data.success) {
                setCounted(response.data.counted)
            } else {
                alert('Favorite count failure')
            }
        })
    }, [])

    const onClickFavorite = () => {
        if (Counted) {
            axios.post('/api/favorite/removeFromFavorite', info)
            .then(response => {
                if (response.data.success) {
                    setCount(Count - 1)
                    setCounted(!Counted)
                } else {
                    alert('Failed to delete from favorite list.')
                }
            })
        } else {
            axios.post('/api/favorite/addToFavorite', info)
            .then(response => {
                if (response.data.success) {
                    setCount(Count + 1)
                    setCounted(!Counted)
                } else {
                    alert('Failed to add to favorite list.')
                }
            })
        }
    }

    return (
        <Popover content={Count}>
            <button onClick={onClickFavorite} className='favorite'>{Counted ? <Icon type="heart" theme="filled" /> : <Icon type="heart" />  }</button>
        </Popover>
    )
}

export default FavoriteBtn
