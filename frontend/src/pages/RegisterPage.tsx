import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Registering...");
        try {
            const response = await axios.post('http://localhost:5000/register', { fname, lname, email, password });
            if (response.status === 201) {
                console.log("Registration successful!");
                navigate('/profile');
            } else {
                setError("Registration failed. Please check your credentials and try again.");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error("Error response:", error.response.data);
                    if (error.response.status === 400) {
                        setError("Email id already exists. Please try login.");
                    } else {
                        setError(`Error: ${error.response.status}. Please try again.`);
                    }
                } else {
                    console.error("Axios error:", error.message);
                    setError("Network error. Please check your connection and try again.");
                }
            } else {
                console.error("Non-Axios error:", error);
                setError("An error occurred while trying to register. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex text-center lg:text-left mb-8">
                <h1 className="text-5xl font-bold text-white">Register Here</h1>
                <h1 className="text-5xl font-bold text-primary">!</h1>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleRegister}>
                    <div className="flex gap-2">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-white font-bold">First Name</span>
                            </label>
                            <input type="text" placeholder="first name" name="fname" className="input input-bordered input-primary w-full max-w-xs"
                                onChange={(e) => setFname(e.target.value)} />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-white font-bold">Last Name</span>
                            </label>
                            <input type="text" placeholder="last name" name="lname" className="input input-bordered input-primary w-full max-w-xs"
                                onChange={(e) => setLname(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white font-bold">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white font-bold">Password</span>
                        </label>
                        <input type="password" placeholder="password" name="password" className="input input-bordered input-primary w-full max-w-xs"
                            onChange={(e) => setPassword(e.target.value)} />
                        <label className="label flex justify-center">
                            {error && <span className="text-red-500">{error}</span>}
                        </label>
                    </div>
                    <div className="form-control">
                        <button className="btn btn-primary rounded-full" type="submit">Register</button>
                    </div>
                    <label className="label flex justify-center">
                        <span className="label-text-alt mr-1">Already have an accout?</span>
                        <a href="/login" className="label-text-alt link link-hover text-primary font-bold">Login here</a>
                    </label>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
