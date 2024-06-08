import Footer from "../Components/Footer";
import MovieCard from "../Components/MovieCard";
import NavBar from "../Components/NavBar";

function MovieCardPage() {
    return (
        <div className="home-page flex flex-col justify-center items-center">
            <NavBar />
            <MovieCard />
            <Footer />
        </div>
    );
}

export default MovieCardPage;
