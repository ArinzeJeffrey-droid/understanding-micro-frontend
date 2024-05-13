import React, { Suspense } from "react";
import "./App.scss";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
const HomePage = React.lazy(() => import("homepage/HomePage"));
const DetailsPage = React.lazy(() => import("detailspage/DetailsPage"));
const SeatSelectionPage = React.lazy(() =>
  import("seatselection/SeatSelection")
);

const App = () => {
  const location = useLocation();
  const history = useHistory();

  const movieClicked = (movie) => history.push(`details/${movie.id}`);

  return (
    <Switch>
      <Route path="/details/:id">
        <Suspense fallback={null}>
          <DetailsPage routing={{ history, location }} />
        </Suspense>
      </Route>
      <Route path="/book">
        <Suspense fallback={null}>
          <SeatSelectionPage />
        </Suspense>
      </Route>
      <Route path="/">
        <Suspense fallback={null}>
          <HomePage
            movieClicked={movieClicked}
            routing={{ history, location }}
          />
        </Suspense>
      </Route>
    </Switch>
  );
};

export default App;
