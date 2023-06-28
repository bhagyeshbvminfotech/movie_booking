import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Movieposter.css";
import { Link } from "react-router-dom";
import {moviesURL} from "./constant";



function Poster() {
    const [movieData, setMovieData] = useState([]);


    useEffect(() => {
        axios
            .get("https://movie-910b4-default-rtdb.firebaseio.com/Movieposterlist.json")
            .then((response) => {
                const data = response.data;
                const movieList = Object.values(data)[0]; // Accessing the nested array of movies
                setMovieData(movieList);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);



    return (
        <div className="App">
            <h1>Movie Name</h1>
            <div className="poster-container">
                {movieData.map((movie) => (
                    <Link
                        key={movie.id}
                        to={{
                            pathname: `${moviesURL}/${(movie.name)}`,
                            state: { movieName: movie.name }
                        }}
                        className="poster-card"
                    >
                        <img
                            src={movie.imageSrc}
                            alt={movie.name}
                            className="poster-image"
                        />
                        <h2 className="poster-title">{movie.name}</h2>
                        <ul className="poster-languages">
                            {movie.language.map((lang) => (
                                <li key={lang}>{lang},</li>
                            ))}
                        </ul>
                    </Link>

                ))}
            </div>
        </div>
    );
}

export default Poster;
