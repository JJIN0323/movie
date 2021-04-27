import React, { useState } from 'react'
import { Col } from 'antd'

function GridImage(props) {

    // Hover event
    const [isShow, setIsShow] = useState(false)

    if (props.landingPage) {
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
    } else {
        return (
            <Col lg={4} md={8} xs={24}>
                
                <div className='GridItem'>
                    <div className='GridItemCast'>
                        <img src={props.image} alt={props.castName} />
                    </div>
                    <p className='castName'>{`${props.castName}`}</p>
                </div>
            </Col>
        )
    }
}

export default GridImage
