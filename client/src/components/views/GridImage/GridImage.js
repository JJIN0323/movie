import React, { useState } from 'react'
import { Col } from 'antd'

function GridImage(props) {

    // Hover event
    const [isShow, setIsShow] = useState(false);

    return (
        <Col lg={6} md={8} xs={24}>
            
            <div className='GridItem' 
                onMouseOver={() => setIsShow(true)} 
                onMouseLeave={() => setIsShow(false)}>

                <div className='GridItemImg'>
                    <a href={`/movie/${props.movieId}`} >
                        {isShow &&( 
                            <div className='overlay'>
                                <div className='description'>
                                    <p>{`${props.movieName}`}</p>
                                    <span>{`${props.movieDescription}`}</span>
                                </div>
                            </div>
                        )}
                        <img src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </div>
        </Col>
    )
}

export default GridImage
