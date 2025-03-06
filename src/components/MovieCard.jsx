import React from 'react'

const MovieCard = ({movie : {title, vote_average, poster_path, release_date, orignal_language}}) => {
  return (
    <div className='movie-card'>
        
        <img src={
            poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'
        } alt={title}/>

        <div className='mt-4'>
            <p className="text-white">{title}</p>
            <div className='content'>
                <div className='rating'>
                    <img src="star.svg" alt="Star Icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>.</span>
                <p className='year'>
                    {release_date ? release_date.split('-')[0] : 'N/A'}
                </p>
            </div>

        </div>
    </div>
  )
}

export default MovieCard