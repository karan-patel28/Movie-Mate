const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
// const connectToDB = require('./controller/db-controller');
// const { loginController, registerController, getUsersController, LogoutController, authenticateToken } = require('./controller/user-controller');
const { movieController, genreController, randomMovieByGenre } = require('./controller/movie-controller');
// const { getMovieByTitle, getAllMovies } = require('./controller/reco-controller');

const app = express();
const port = process.env.PORT;
// connectToDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// User Registration Route
// app.post('/register', registerController);

// User Login Route
// app.post('/login', loginController);

// Watchlist Route'
// app.post('/watchlist', watchlistController);

// Home Route
app.get('/home', (req, res) => {
    res.send('Welcome to the home page');
});

// Get All Users Route
// app.get('/users', getUsersController);

// Logout Route
// app.get('/logout', LogoutController);

// Genre Route
app.get('/genre', genreController);

// Movie Data Route
app.get('/movie', movieController);

// Random Movie By Genre Route
app.get('/random', randomMovieByGenre);

// Get Movie List Route
// app.get('/movieList', getMovieList);

// authentification of token
// app.get('/auth', authenticateToken, (req, res) => {
//     res.status(200).json({ isAuthenticated: true });
// });

// recomandation route
// app.get('/reco', getMovieByTitle);

// Recommended Movies Route
// app.get('/recoList', getAllMovies);

app.listen(port, (req, res) => {
    console.log(`server connected on port ${port}`)
});
