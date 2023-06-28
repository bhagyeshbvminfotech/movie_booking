// Login.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import {moviesURL} from "./constant";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    function handleAccount() {
        const { email, password } = formData;
        if (!email || !password) {
            alert("Please fill in all required fields.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const token = await user.getIdToken();
                localStorage.setItem("firebaseToken", token);
                navigate(moviesURL);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Invalid credentials. Please try again.");
            });

        setFormData({
            email: "",
            password: ""
        });
    }

    return (


        <div className="card">
                    <div className="onlyall">
                        <h2 style={{ textAlign: "center", fontFamily: "-moz-initial", color: "#145585" }}>Login to your Account</h2>
                        <div className="twodiv">
                            <label className="required">
                                Email:
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="inputall"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="required">
                                Password:
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="inputall"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </label>
                            <div>
                                <button className="button" onClick={handleAccount}>
                                    Login
                                </button>
                            </div>
                        </div>
                        <p>
                            Don't have an account? <Link to="/SignUp">Sign up</Link>
                        </p>
                    </div>

        </div>
    );
};

export default Login;
