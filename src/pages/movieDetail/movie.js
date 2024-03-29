import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import PersonDetails from "./PersonDetails"; // Import the PersonDetails component

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const [actors, setActors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [displayedActors, setDisplayedActors] = useState(5);
  const [displayedProducers, setDisplayedProducers] = useState(5);
  const { id } = useParams();

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setMovie(data));
  };

  const getAdditionalData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setActors(data.cast));

    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => res.json())
      .then(data => setProducers(data.crew.filter(member => member.job === 'Producer')));
  };

  useEffect(() => {
    getData();
    getAdditionalData();
    window.scrollTo(0, 0);
  }, []);

  const handleViewMore = (type) => {
    if (type === "actors") {
      setDisplayedActors(displayedActors + 5);
    } else if (type === "producers") {
      setDisplayedProducers(displayedProducers + 5);
    }
  };

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt="Backdrop" />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} alt="Poster" />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {currentMovieDetail && currentMovieDetail.genres ? currentMovieDetail.genres.map(genre => (
                                <span key={genre.id} className="movie__genre">{genre.name}</span>
                            )) : ""}
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                </div>
            </div>
            {/* Actors */}
            <h1>Actors</h1>
      <div className="movie__actors">
        
        {/* <div className="heading">Actors</div> */}
        {actors.slice(0, displayedActors).map(actor => (
          <PersonDetails key={actor.id} person={actor} />
        ))}
        {actors.length > displayedActors && (
          <button
            className="btn btn-sucess"
            onClick={() => handleViewMore("actors")}
          >
            View More
          </button>
        )}
      </div>

      {/* Producers */}
      <h1>Producers</h1>
      <div className="movie__producers">
        {/* <div className="movie__heading">Producers</div> */}
        {producers.slice(0, displayedProducers).map(producer => (
          <PersonDetails key={producer.id} person={producer} />
        ))}
        {producers.length > displayedProducers && (
          <button
            className="btn btn-secess"
            onClick={() => handleViewMore("producers")}
          >
            View More
          </button>
        )}
      </div>

        </div>
    );
}

export default Movie;
