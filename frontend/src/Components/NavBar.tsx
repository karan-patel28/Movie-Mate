import logoImage from '../assets/logo.webp';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

const NavBar = () => {

    const navigate = useNavigate();
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // const checkAuthStatus = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/auth', { withCredentials: true });
    //         setIsAuthenticated(response.data.isAuthenticated);
    //     } catch (error) {
    //         console.log("Authentication check failed:", error);
    //         setIsAuthenticated(false);
    //     }
    // };

    // useEffect(() => {
    //     checkAuthStatus();
    // }, []);

    const goHome = () => navigate('/');
    // const goLogin = () => navigate(isAuthenticated ? '/profile' : '/login');

    // const logout = async () => {
    //     try {
    //         await axios.get('http://localhost:5000/logout', { withCredentials: true });
    //         setIsAuthenticated(false);
    //         navigate('/login');
    //     } catch (error) {
    //         console.error("Logout failed:", error);
    //     }
    // };

    return (
        <div className="navbar bg-base-100 bg-blue-800 rounded-full" style={{ width: '70%', margin: '0 auto' }}>
            <div className="navbar-start">
                <a onClick={goHome} className="btn btn-ghost btn-circle text-xl rounded-full">
                    <img src={logoImage} alt="Movie Mate" className="h-12" />
                </a>
            </div>

            <div className="navbar-center">
                {/* <a className="btn btn-ghost text-xl text-white" onClick={logout}>Movie Mate</a> */}
                <a className="btn btn-ghost text-xl text-white" onClick={goHome}>Movie Mate</a>
            </div>

            <div className="navbar-end">
                {/* <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" onClick={goLogin}>
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                </div> */}
            </div>
        </div >
    );
}

export default NavBar;
