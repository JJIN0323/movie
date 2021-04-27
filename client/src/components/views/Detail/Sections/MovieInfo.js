import React from 'react'
import { IMAGE_URL } from '../../../Config'
import FavoriteBtn from './FavoriteBtn'

function MovieInfo(props) {

    let {movie} = props

    return (
        <>
        <div className='movieInfoBg' style={{
            background: `url('${IMAGE_URL}original${movie.backdrop_path}'), #000000`}}>
            <div className='movieInfoMask'></div>
        </div>

        <div className='movieInfoDetail'>
            {/*<img src={movie.poster_path ? `${IMAGE_URL}w200${movie.poster_path}` : null} />*/}
            
            <div>
                <dl className='movieInfo'>
                    <dt>Title</dt>
                    <dd>{movie.original_title}</dd>
                </dl>
                <dl className='movieInfo'>
                    <dt>Relese Date</dt>
                    <dd>{movie.release_date}</dd>
                </dl>
                <dl className='movieInfo'>
                    <dt>Runtime</dt>
                    <dd>{movie.runtime}</dd>
                </dl>
                <dl className='movieInfo'>
                    <dt>Status</dt>
                    <dd>{movie.status}</dd>
                </dl>
                <dl className='movieInfo'>
                    <dt>Vote Average</dt>
                    <dd>{movie.vote_average}</dd>
                </dl>
                <dl className='movieInfo'>
                    <dt>Popularity</dt>
                    <dd>{movie.popularity}</dd>
                </dl>
                <dl className='movieInfo'>
                    <dt>Favorite</dt>
                    <dd><FavoriteBtn movieInfo={movie} movieId={movie.id} userFrom={localStorage.getItem('userId')} /></dd>
                </dl>
            </div>
        </div>

            <div className='containerSmall'>
                <p className='subject'>Overview</p>
                    <div className='paddingTop'>
                        <p className='overview'>{movie.overview}</p>
                    </div>
            </div>
        </>
    )
}

export default MovieInfo
