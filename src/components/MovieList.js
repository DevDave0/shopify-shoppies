import React from 'react';

const MovieList = (props) => {
    const NominationComponent = props.nominationComponent 
    return (
        <>
            {props.movies.map((movie, index) => 
                <div className="image-container d-flex justify-content-start m-3" key={index}>
                    <img src={movie.Poster} alt='movie'></img>
                    <div onClick={() => props.handleNominationClick(movie)} className="overlay d-flex align-items-center justify-content-center">
                        <NominationComponent movie={movie} />
                    </div>
                </div>
            )}
        </>
    )
}

export default MovieList;