import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Genre() {
    const [genre, setGenre] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const genreToEmoji = {
        Action: "😎",
        Adventure: "🤪",
        Animation: "😄",
        Comedy: "😂",
        Crime: "😏",
        Documentary: "🧐",
        Drama: "😢",
        Family: "😊",
        Fantasy: "🧝‍♂️",
        History: "🤔",
        Horror: "😱",
        Music: "🙂",
        Mystery: "🕵️‍♂️",
        Romance: "😍",
        "Science Fiction": "🤯",
        "TV Movie": "🤓",
        Thriller: "😨",
        War: "💥",
        Western: "🤠",
      };      

    useEffect(() => {
        fetch('http://localhost:5000/genre')
            .then(res => res.json())
            .then(
                (result) => setGenre(result),
                (error) => setError(error)
            )
            .catch(error => setError(error));
    }, []);

    const handleGenreClick = (genreId: number) => {
        navigate(`/moviepage/${genreId}`);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-4 gap-4 my-8 md-8">
            {genre.map((item: { id: number, name: string }) => (
                <button key={item.id} className="btn btn-outline btn-primary gap-2 text-base" onClick={() => handleGenreClick(item.id)}>
                    <span className="text-xl">{genreToEmoji[item.name as keyof typeof genreToEmoji] || "🙂"}</span>{item.name}
                </button>
            ))}
        </div>
    );
}

export default Genre;
