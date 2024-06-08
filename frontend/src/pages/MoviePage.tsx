import NavBar from "../Components/NavBar";
import Card from '../Components/Card';
import Footer from "../Components/Footer";

function MoviePage() {
    return (
        <div className="home-page flex flex-col items-center justify-center">
            <NavBar />
            <Card />
            <Footer />
        </div>
    );
}

export default MoviePage;
