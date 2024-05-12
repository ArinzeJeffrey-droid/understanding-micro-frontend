const Express = require("express");
const moviesData = require("./moviesData.json");
const path = require("path");
const cors = require("cors");

const App = Express();

App.use(cors());
App.use(Express.static("public"));

App.get("/movies", (_, res) => {
  res.send(moviesData);
});

App.get("/movies/:id", (req, res) => {
  moviesData.find((movie) => {
    if (movie.id === parseInt(req.params.id)) {
      const options = {
        root: path.join(__dirname, "assets/images/"),
      };
      res.sendFile(movie.imageUrl, options, (err) => {
        if (err) {
          res.sendStatus(404);
        } else {
          console.log("File sent to client");
        }
      });
    }
  });
});

App.listen(5555, () => {
  console.log("Application started on port 5555");
});
