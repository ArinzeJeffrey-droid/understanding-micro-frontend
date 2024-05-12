# Micro Frontends Demo

This is a simple application designed to help me understand how micro frontends work. It demonstrates the usage of `ModuleFederationPlugin` from webpack to export and import components across multiple projects.

## How to run project

// TODO: create procfile to use overmind to run the node processes 

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
    <QuickBooking></QuickBooking>
    <Suspense fallback={null}>
      <ul className="movies-container">{renderMovieList()}</ul>
    </Suspense>
  </div>
);
```

React.lazy can efficiently load components only when they are needed, improving performance and reducing initial bundle size.
