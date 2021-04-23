import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import MovieInfo from './Sections/MovieInfo'
import { Row } from 'antd'
import GridImage from '../GridImage/GridImage'

function Detail(props) {

    // 현재 PAGE의 URL에 ROUTE 가져온다
    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])

    useEffect(() => {
        
        //console.log(props.match)

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log('Info', response)
            setMovie(response)
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            console.log('Crew', response)
            setCasts(response.cast)
        })
        
    }, [])

    return (
        <div className='container'>
            <div>
                {/* Movie Info */}
                <MovieInfo movie={Movie} />
            </div>
            <div>
                {/* Actors Grid - limit 12 */}

                <Row className='paddingTop'>
                    {Casts && Casts.slice(0, 12).map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridImage
                                image={cast.profile_path ?
                                    `${IMAGE_URL}w200${cast.profile_path}` : null}
                                castName={cast.name} />
                        </React.Fragment>
                        ))}
                    </Row>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Detail
