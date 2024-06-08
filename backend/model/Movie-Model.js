const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
    {
        movieId: {
            type: String,
            ref: 'Movie',
            required: true
        },
        Title: {
            type: String,
            required: true
        },
        Year: {
            type: String,
            required: true
        },
        Runtime: {
            type: String,
            required: true
        },
        Genre: {
            type: String,
            required: true
        },
        Plot: {
            type: String,
            required: true
        },
        Poster: {
            type: String,
            required: true
        },
        Language: {
            type: String,
            required: true
        },
        imdbRating: {
            type: String,
            required: true
        }
    },
    { collection: 'movie-data'}
);

module.exports = mongoose.model('movie-data', MovieSchema);