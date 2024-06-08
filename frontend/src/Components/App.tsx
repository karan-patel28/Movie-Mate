import { createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Genre from '../Components/genre';
import MoviePage from '../pages/MoviePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
import MovieCardPage from '../pages/MovieCardPage';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

function App() {

    return (
        <Router>
            <div className="flex justify-center pt-4 h-screen">
                <div className="artboard artboard-horizontal phone-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/genre" element={<Genre />} />
                        <Route path="/moviepage/:genreId" element={<MoviePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/signup" element={<RegisterPage />} />
                        <Route path="/logout" element={<HomePage />} />
                        <Route path="/movie" element={<MovieCardPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
