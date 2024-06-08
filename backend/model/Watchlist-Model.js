const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: 'User',
            required: true
        },
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
        Genre:{
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
        imdbRating: {
            type: String,
            required: true
        },
        trailer: {
            type: String,
            required: true
        }
    },
    { collection: 'watchlist-data' }
);

module.exports = mongoose.model('watchlist-data', watchlistSchema);
