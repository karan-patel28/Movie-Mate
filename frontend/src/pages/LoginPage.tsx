import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await axios.get('http://localhost:5000/auth', {
                    withCredentials: true
                });
                if (response.data.isAuthenticated) {
                    navigate('/profile');
                }
            } catch (error) {
                console.log("Not authenticated", error);
            }
        }
        checkAuth();
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Logging in...");
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password }, {
                withCredentials: true
            });
            if (response.status === 200) {
                console.log("Login successful!");
                navigate('/profile');
            } else {
                setError("Login failed. Please check your credentials and try again.");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error("Error response:", error.response.data);
                    if (error.response.status === 400) {
                        setError("Invalid credentials. Please try again.");
                    } else {
                        setError(`Error: ${error.response.status}. Please try again.`);
                    }
                } else {
                    console.error("Axios error:", error.message);
                    setError("Network error. Please check your connection and try again.");
                }
            } else {
                console.error("Non-Axios error:", error);
                setError("An error occurred while trying to login. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex text-center lg:text-left mb-8">
                <h1 className="text-5xl font-bold text-white">Login Here</h1>
                <h1 className="text-5xl font-bold text-primary">!</h1>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white font-bold">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white font-bold">Password</span>
                        </label>
                        <input type="password" placeholder="password" name="password" className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(e) => setPassword(e.target.value)} required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        <label className="label flex justify-center">
                            {error && <span className="text-red-500">{error}</span>}
                        </label>
                    </div>
                    <div className="form-control">
                        <button className="btn btn-primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                    <label className="label flex justify-center">
                        <span className="label-text-alt mr-1">Don't have an account?</span>
                        <a href="/signup" className="label-text-alt link link-hover text-primary font-bold">Register Here</a>
                    </label>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
