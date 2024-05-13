# Micro Frontends Demo

This is a simple application designed to help me understand how micro frontends work. It demonstrates the usage of `ModuleFederationPlugin` from webpack to export and import components across multiple projects.

## How to run project

**Install Dependencies**: Run the setup script to install npm dependencies for each app:

```sh
script/setup
```

**Manage Processes**: This project utilizes Overmind to manage processes for each app. To start all processes, use:

```sh
overmind start
```

If you need to restart a specific process, open another terminal and use:

```sh
overmind restart <app-name>
```

Replace <app-name> with the name of the app you want to restart.

For detailed instructions on installing Overmind, refer to the [Overmind installation guide](https://github.com/DarthSim/overmind).

## Urls

| App                 | Url                          |
| ------------------- | ---------------------------- |
| ExpressServer       | http://localhost:5555/movies |
| HomePageApp         | http://localhost:3000        |
| MAIN APP (MovieApp) | http://localhost:9000        |
| ReactComponents     | http://localhost:3002        |
| SeatSelectionApp    | http://localhost:3003        |

## My notes

### Using ModuleFederationPlugin

The core functionality of this demo relies on the `ModuleFederationPlugin` from webpack. This plugin allows me to export components from one project and import them into another seamlessly.

In the `ReactComponents` project webpack config file, I use ModuleFederationPlugin to export components:

```js
new ModuleFederationPlugin({
  name: "components",
  filename: "remoteEntry.js",
  exposes: {
    "./MovieCard": "./src/components/MovieCard/MovieCard.jsx",
    "./BuyButton": "./src/components/Button/BuyButton/BuyButton.jsx",
  },
}),
```

And in the `HomePageApp` project webpack config file, I import these components:

```js
new ModuleFederationPlugin({
  name: "home",
  filename: "remoteEntry.js",
  remotes: {
    components: "components@http://localhost:3002/remoteEntry.js",
  },
});
```

For more detailed information about ModuleFederationPlugin, refer to the [official documentation](https://webpack.js.org/plugins/module-federation-plugin/).

### Importing components

I import components dynamically using React.lazy, which allows for code splitting and lazy loading:

```js
const MovieCard = React.lazy(() => import("components/MovieCard"));

// Usage by wrapping the component with the Suspense wrapper

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
    <QuickBooking />
    <Suspense fallback={null}>
      <ul className="movies-container">{renderMovieList()}</ul>
    </Suspense>
  </div>
);
```

React.lazy can efficiently load components only when they are needed, improving performance and reducing initial bundle size.
