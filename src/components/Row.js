import axios from "../axios";
import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import "./row.css";

const base_url = "https://image.tmdb.org/t/p/original/"; //img url
const API_KEY = `e20503cc4ae5c1da1319686170a6093d`;

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // axios import in axios instance to set create instance set after usl rendering
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleTrailer = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const movieTrailer = await axios.get(
        `/movie/${movie.id}/videos?api_key=${API_KEY}`
      );
      setTrailerUrl(movieTrailer.data.results[0]?.key);
    }
  };

  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row_posters">
          {movies.map(
            (movie) =>
              movie.backdrop_path &&
              movie.poster_path !== null && (
                <img
                  key={movie.id}
                  onClick={() => handleTrailer(movie)}
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              )
          )}
        </div>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>
    </>
  );
}

export default Row;
