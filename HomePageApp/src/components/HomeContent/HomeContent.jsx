import React, { Suspense, useEffect, useState } from "react";
import QuickBooking from "../QuickBooking/QuickBooking.jsx";
const MovieCard = React.lazy(() => import("components/MovieCard"));
import "./HomeContent.scss";
import RoutingContext from "../../utils/RoutingProvider.js";

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
    <RoutingContext.Provider value={props.routing}>
      <div className="home-content-container">
        <QuickBooking />
        <ul className="movies-container">
          <Suspense fallback={null}>{renderMovieList()} </Suspense>
        </ul>
      </div>
    </RoutingContext.Provider>
  );
};

export default HomeContent;
