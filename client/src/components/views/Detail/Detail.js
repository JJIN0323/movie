import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import MovieInfo from './Sections/MovieInfo'
import { Row } from 'antd'
import GridImage from '../GridImage/GridImage'
import noImg from './noImg.png'

function Detail(props) {

    // 현재 PAGE의 URL에 ROUTE 가져온다
    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [Reviews, setReviews] = useState([])

    useEffect(() => {
        
        //console.log(props.match)

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        let endpointReview = `${API_URL}movie/${movieId}/reviews?api_key=${API_KEY}`

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            //console.log('Info', response)
            setMovie(response)
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            //console.log('Crew', response)
            setCasts(response.cast)
        })

        fetch(endpointReview)
        .then(response => response.json())
        .then(response => {
            //console.log('Reviews', response)
            setReviews(response.results)
        })
        
    }, [])

    return (
        <>
            {/* Movie Info */}
            <MovieInfo movie={Movie} />

            {/* Movie Reviews */}
            {Reviews && Reviews.slice(0, 1).map((results) => (
                <React.Fragment key={results.id}>
                    <div className='containerSmall'>
                        <p className='subject'>Review</p>
                        <Row className='paddingTop'>
                            <blockquote>
                                {results.content ? `${results.content}` : null}
                            </blockquote>
                        </Row>
                    </div>
                </React.Fragment>
            ))}

            {/* Actors Grid - limit 6 */}
            <div className='containerSmall'>
                <p className='subject'>Cast</p>
                <Row className='paddingTop'>
                    {Casts && Casts.slice(0, 6).map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridImage
                                image={cast.profile_path ?
                                `${IMAGE_URL}w200${cast.profile_path}` : `${noImg}`}
                            castName={cast.name} />
                        </React.Fragment>
                    ))}
                </Row>
            </div>
        </>
    )
}

export default Detail
