import Footer from '../Components/Footer';
import NavBar from '../Components/NavBar';
import Genre from '../Components/genre';
import HomeText from '../Components/texts';

const HomePage = () => {
    return (
        <div className="home-page flex flex-col">
            <NavBar />
            <HomeText />
            <Genre />
            <Footer />
        </div>
    );
}

export default HomePage;
