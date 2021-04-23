import React from 'react'
import { IMAGE_URL } from '../../../Config'

function MovieInfo(props) {

    let {movie} = props

    return (
        <>
        <div className='floatLeft'>
            <img src={movie.poster_path ? `${IMAGE_URL}w200${movie.poster_path}` : null} />
        </div>

        <div className=''>
        <table>
            <tbody>
                <tr>
                    <td>Title</td>
                    <td>{movie.original_title}</td>
                    <td>Relese Date</td>
                    {/* 장르 뿌려줄땐 array.map() 메서드를 이용해서 뿌려줘야함 */}
                    <td>{movie.release_date}</td>
                </tr>
                <tr>
                    <td>Runtime</td>
                    <td>{movie.runtime}</td>
                    <td>Status</td>
                    <td>{movie.status}</td>
                </tr>
                <tr>
                    <td>Vote Average</td>
                    <td>{movie.vote_average}</td>
                    <td>Popularity</td>
                    <td>{movie.popularity}</td>
                </tr>
            </tbody>
        </table>
        </div>

        <div>
            {/* short overview */}
            {movie.overview}
        </div>
        </>
    )
}

export default MovieInfo
