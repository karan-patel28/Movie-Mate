require('dotenv').config();
const axios = require('axios');
const CallCount = require('../model/API-Model');
const MovieModel = require('../model/Movie-Model');

const apiKey = process.env.OMDB_API_KEY;
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

async function getMovieByTitle(req, res) {
    try {
        const { title } = req.query;
        const requestUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;
        const response = await axios.get(requestUrl);
        const movieData = response.data;
        const movie = new MovieModel ({
            movieId: movieData.imdbID,
            Title: movieData.Title,
            Year: movieData.Year,
            Runtime: movieData.Runtime,
            Genre: movieData.Genre,
            Plot: movieData.Plot,
            Poster: movieData.Poster,
            Language: movieData.Language,
            imdbRating: movieData.imdbRating,
        });
        const existingMovie = await MovieModel.findOne({ Title: title });
        if (!existingMovie) {
            await movie.save();
            console.log('Movie data saved to database');
        }
        res.send(movieData);
    } catch (error) {
        console.error(error);
        console.error('Error fetching movie data');
    }
};

async function getAllMovies(req, res) {
    try {
        const movieList = await MovieModel.find();
        res.send(movieList);
    } catch (error) {
        console.error(error);
        console.error('Error fetching movie list');
    }
}

module.exports = { getMovieByTitle, getAllMovies };
