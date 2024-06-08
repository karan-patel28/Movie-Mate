import { useEffect, useState, useRef } from 'react';
import Loading from './Loading';

interface MovieData {
    Title: string;
    Year: string;
    Runtime?: string;
    imdbRating: string;
    Language?: string;
    Plot: string;
    Genre: string;
    Poster: string;
}

function MovieGrid() {
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    const badgeColors = [
        "badge-success",
        "badge-warning", 
        "badge-error",
        "badge-info",
        "badge-neutral"
    ];

    const fetchMovies = async () => {
        try {
            const response = await fetch(`http://localhost:5000/recoList`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: MovieData[] = await response.json();
            setMovies(data);
        } catch (error: any) {
            setError(error.message);
        }
    }

    useEffect(() => {
        if (!hasFetched.current) {
            fetchMovies();
            hasFetched.current = true;
        }
    }, []);

    if (error) {
        return <div className="card bg-base-200"><p>{error}</p></div>;
    }

    if (!movies || movies.length === 0) {
        return <Loading />;
    }

    return (
        <div className="grid grid-cols-3 gap-10">
            {movies.map((movie, index) => (
                <div key={index} className="card w-full my-10 bg-base-100 shadow-xl image-full"> 
                    <figure>
                        <img src={movie.Poster} alt={movie.Title} />
                    </figure>
                    <div className="card-body px-3 py-3 flex justify-end">
                        <h2 className="card-title text-white">
                            {movie.Title}
                        </h2>

                        <div className="text-sm flex items-center text-white">
                            <span>{movie.Year}</span>
                            <span className="mx-2">·</span>
                            <span>{movie.Runtime}</span>
                        </div>
                        <div className="text-sm flex items-center text-white">
                            <span>⭐ {movie.imdbRating}/10</span>
                            <span className="mx-2">·</span>
                            <span>{movie.Language}</span>
                        </div>

                        <div className="genres">
                            {movie.Genre.split(', ').map((genre, idx) => {
                                const badgeClass = badgeColors[idx % badgeColors.length];
                                return (
                                    <span key={idx} className={`badge ${badgeClass} mr-1`}>{genre}</span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MovieGrid;
