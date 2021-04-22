import React, { useEffect, useState } from 'react'
import { Row, Button } from 'antd'
import GridImage from '../GridImage/GridImage'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    
        fetchMovies(endpoint)
        
    }, [])

    // endpoint만 바뀌기 때문에, endpoint는 파라메터로 넘기고 나머지만
    const fetchMovies = (endpoint) => {

        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            //console.log(response.results)
            // ...response.results만 받으면, 앞에 데이터에 덮어 씌워지므로,
            // ...Movies를 붙여 앞에 데이터는 살리고 새로운 데이터가 로드되도록 한다
            setMovies([...Movies, ...response.results]) 
            setCurrentPage(response.page)
        })
    }

    const loadMoreImage = () => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`
        fetchMovies(endpoint)
    }

    return (
        <div className='container'>
                {/* latest */}
                <div className='thinTitle'>Be More with Movie</div>
                    <p className='subTitle'>Millions of movies and people to discover. Explore now.</p>

                    {/* movie grid cards ( + Row gutter={[16, 16]} ) */}
                    <Row className='paddingTop'>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridImage
                                image={movie.poster_path ?
                                    `${IMAGE_URL}w400${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                                movieDescription={movie.overview} />
                        </React.Fragment>
                        ))}
                    </Row>
                    <Button className='yellowButton marginTop' onClick={loadMoreImage}>Load More</Button>
        </div>
    )
}

export default LandingPage
