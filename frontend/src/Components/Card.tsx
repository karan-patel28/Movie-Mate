import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Loading from './Loading';

interface MovieData {
    Title: string;
    Year: string;
    Runtime: string;
    imdbRating: string;
    Language: string;
    Plot: string;
    Genre: string;
    movieTrailer: string;
}

interface ApiResponse {
    movieData: MovieData;
    movieTrailer: string;
}

function Card() {
    // Show movie on card
    const { genreId } = useParams();
    const [movie, setMovie] = useState<MovieData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [genres, setGenres] = useState<string[]>([]);
    const [trailer, setTrailer] = useState<string | null>(null);
    const hasFetched = useRef(false);

    const badgeColors = [
        "badge-error",
        "badge-warning",
        "badge-info",
        "badge-success",
        "badge-neutral"
    ];

    const fetchMovie = async () => {
        try {
            const response = await fetch(`http://localhost:5000/movie?genreId=${genreId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: ApiResponse = await response.json();
            setMovie(data.movieData);
            setTrailer(data.movieTrailer);
            setGenres(data.movieData.Genre.split(', '));
        } catch (error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            fetchMovie();
            hasFetched.current = true;
        }
    }, []);

    useEffect(() => {
        console.log(`Data: ${movie?.movieTrailer}`); // Add this line to debug the trailer URL
    }, [movie]);

    const handleNext = () => {
        fetchMovie();
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movie) {
        return <Loading />;
    }

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl my-8" style={{ width: '70%' }}>
            <figure className="relative w-full h-full">
                <iframe
                    width="560"
                    height="315"
                    src={trailer || ''}
                    title={movie?.Title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                </iframe>

            </figure>
            <div className="card-body">
                <h2 className="card-title text-white">
                    {movie.Title}
                </h2>

                <div className="text-sm mb-4 flex items-center">
                    <span>{movie.Year}</span>
                    <span className="mx-2">·</span>
                    <span>{movie.Runtime}</span>
                    <span className="mx-2">·</span>
                    <span>⭐ {movie.imdbRating}/10</span>
                    <span className="mx-2">·</span>
                    <span>{movie.Language}</span>
                </div>

                <div className="genres mb-4">
                    {genres.map((genre, index) => {
                        const trimmedGenre = genre.trim();
                        const badgeClass = badgeColors[index % badgeColors.length];
                        return (
                            <span key={index} className={`badge ${badgeClass} mr-2`}>{trimmedGenre}</span>
                        );
                    })}
                </div>

                <p className="mb-4 text-white font-bold">{movie.Plot}</p>

                <div className="flex justify-end">
                    {/* <button className="btn btn-outline btn-primary gap-2 text-base">Back</button>
                    <button className="btn btn-outline btn-primary gap-2 text-base">Add to Watchlist</button> */}
                    <button className="btn btn-outline btn-primary gap-2 text-base" onClick={handleNext}>Next</button>
                </div>

            </div>
        </div>
    )
}

export default Card;
