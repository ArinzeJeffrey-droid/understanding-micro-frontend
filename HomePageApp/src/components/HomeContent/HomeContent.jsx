import React, { Suspense, useEffect, useState } from "react";
import QuickBooking from "../QuickBooking/QuickBooking.jsx";
const MovieCard = React.lazy(() => import("components/MovieCard"));
import "./HomeContent.scss";

const HomeContent = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(async () => {
    const request = await fetch("http://localhost:5555/movies");
    const results = await request.json();
    setMovies(results);
  }, []);

  const movieClicked = (item) => {
    if (typeof props.movieClicked === "function") {
      props.movieClicked(item);
    }
  };

  const renderMovieList = () => {
    let items = movies.map((movie) => {
      return (
        <li onClick={() => movieClicked(movie)} key={movie.name}>
          <MovieCard title={movie.name} imageUrl={movie.imageUrl} />
        </li>
      );
    });

    return items;
  };

  return (
    <div className="home-content-container">
      <QuickBooking></QuickBooking>
      <Suspense fallback={null}>
        <ul className="movies-container">{renderMovieList()}</ul>
      </Suspense>
    </div>
  );
};

export default HomeContent;
