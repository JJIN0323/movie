import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import MovieTitle from './Sections/MovieTitle'

function Detail(props) {

    // 현재 PAGE의 URL에 ROUTE 가져온다
    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])

    useEffect(() => {
        
        //console.log(props.match)

        //let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response)
        })
        
    }, [])

    return (
        <div className='contianer'>
            <div>
                {/* Title & etc */}
                <MovieTitle movie={Movie} />
            </div>
            <div>
                {/* Movie Info */}
            </div>
            <div>
                {/* Actors Grid */}
            </div>
        </div>
    )
}

export default Detail
