const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const { poolConnect } = require("./config/database");

const app = express();

// View engine setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

// Routes
const actorRoutes = require("./routes/actorRoutes");
const directorRoutes = require("./routes/directorRoutes");
const contentRoutes = require("./routes/contentRoutes");
const seasonRoutes = require("./routes/seasonRoutes");
const episodeRoutes = require("./routes/episodeRoutes");

app.use("/actors", actorRoutes);
app.use("/directors", directorRoutes);
app.use("/contents", contentRoutes);
app.use("/seasons", seasonRoutes);
app.use("/episodes", episodeRoutes);

// Home route
app.get("/", (req, res) => {
    res.render("index", { title: "Movie Database" });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error", {
        title: "Error",
        message: "Something went wrong!",
    });
});

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

poolConnect
    .then(() => {
        console.log("Connect DB OK");
    })
    .catch(() => {
        console.log("Deo ok");
    });
