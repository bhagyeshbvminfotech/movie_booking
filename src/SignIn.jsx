import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import {moviesURL} from "./constant"; // Assuming you have exported the 'auth' object from the firebaseConfig module

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        if (!email || !password) {
            setError("Please fill in all required fields.");
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setError(null);
                navigate(moviesURL); // Replace with the desired route after successful sign-up
            })
            .catch((error) => {
                setError("Error creating user. Please try again.");
            });
    };

    return (
        <div className="signup">
            <form onSubmit={handleSignUp}>
                <h2>Sign Up</h2>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
                {error && <p>{error}</p>}
                <p>
                    Already have an account? <Link to="/login">login</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
