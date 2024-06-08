import Footer from '../Components/Footer';
import NavBar from '../Components/NavBar';
import UserData from '../Components/UserData';
import UserMovies from '../Components/UserMovies';

function ProfilePage() {
    return (
        <div className="home-page flex flex-col">
            <NavBar />
            <UserData />
            <UserMovies />
            <Footer />
        </div>
    );
}

export default ProfilePage;
