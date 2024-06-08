const axios = require('axios');
require('dotenv').config();
// const CallCount = require('../model/API-Model');
const WatchlistModel = require('../model/Watchlist-Model');

const apiKey = process.env.OMDB_API_KEY;
const apiKey_tmdb = process.env.MOVIE_API_KEY;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

async function genreController(req, res) {
    try {
        const requestUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey_tmdb}`;
        const response = await axios.get(requestUrl);
        const genere = response.data.genres;
        res.send(genere);
    } catch (error) {
        console.error(error);
        console.error('Error fetching genre data');
    }
}

async function randomMovieByGenre(genreId) {
    try {
        const randomPage = Math.floor(Math.random() * 500);
        const minReleaseDate = '2000-01-01';
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey_tmdb}&with_genres=${genreId}&language=en&page=${randomPage}&primary_release_date.gte=${minReleaseDate}`);
        const movies = response.data;
        if (!movies.results.length) {
            throw new Error('No movies found for the given genre');
        }
        const randomIndex = Math.floor(Math.random() * 20);
        return movies.results[randomIndex]?.original_title;
        console.log(movies.results);
        return movies.results;

    } catch (error) {
        console.error('Error in randomMovieByGenre:', error);
        throw error;
    }
}

async function getYouTubeTrailer(movieTitle) {
    const query = `${movieTitle} movie trailer`;
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${youtubeApiKey}`);
    const videoId = response.data.items[0]?.id?.videoId;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}


async function movieController(req, res) {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const currentTime = `${hours}:${minutes}:${seconds}`;
    try {
        const { genreId } = req.query;
        let movieData = null;
        let movieTrailer = null;

        while (!movieData || (movieData.Response === "False" || parseFloat(movieData.imdbRating) <= 6)) {
            const movietitle = await randomMovieByGenre(genreId);

            if (!movietitle) {
                break;
            }

            movieTrailer = await getYouTubeTrailer(movietitle);
            const requestUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movietitle)}&apikey=${apiKey}`;
            const response = await axios.get(requestUrl);
            movieData = response.data;

            if (movieData.Response === "True" && parseFloat(movieData.imdbRating) > 6) {
                break;
            }
        }

        if (!movieData || movieData.Response === "False") {
            return res.status(404).send('Suitable movie not found');
        }
        console.log(`Data Fetched: ${currentTime}`);
        const today = now.toISOString().split('T')[0];
        // const callCountForToday = await CallCount.findOne({ date: today });

        // if (callCountForToday) {
        //     callCountForToday.count += 1;
        //     await callCountForToday.save();
        // } else {
        //     const newCallCount = new CallCount({ date: today, count: 1 });
        //     await newCallCount.save();
        // }

        res.send({ movieData, movieTrailer });
    } catch (error) {
        console.error('Error in movieController:');
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
        } else if (error.request) {
            console.error(error.request);
        } else {
            console.error('Error', error.message);
        }
        res.status(500).send('Error fetching movie data');
    }
}

// async function watchlistController(req, res) {
//     try {
//         const { userId, movieId, Title, Year, Genre, Plot, Poster, imdbRating, trailer } = req.body;
//         const existingMovie = await WatchlistModel.findOne({ userId, movieId });

//         if (existingMovie) {
//             return res.status(400).send('Movie already in watchlist');
//         }

//         const movie = new WatchlistModel({ userId, movieId, Title, Year, Genre, Plot, Poster, imdbRating, trailer });
//         await movie.save();
//         res.status(201).send('Movie added to watchlist');
//     } catch (error) {
//         console.error('Error in watchlistController:', error);
//         res.status(500).send('Failed to add movie to watchlist');
//     }
// }

// async function getMovieList(req, res) {
//     try {
//         const movies = await WatchlistModel.find({});
//         res.status(200).json(movies);
//     } catch (error) {
//         console.error('Error in getMovieList:', error);
//         res.status(500).send('Failed to fetch watchlist');
//     }
// }

// module.exports = { genreController, movieController, randomMovieByGenre, watchlistController, getMovieList };
module.exports = { genreController, movieController, randomMovieByGenre };
