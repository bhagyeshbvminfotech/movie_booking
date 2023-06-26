import React, { useEffect, useState } from "react";
import axios from "axios";
import { moviesURL } from "./constant";
import { Link, useLocation } from "react-router-dom";
import "./clockcard.css";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ClockData = () => {
    const [timedata1, setTimedata1] = useState([]);
    const location = useLocation();
    const movie= location.pathname;
    const moviename=movie.split("/")


    useEffect(() => {
        axios
            .get("https://time-3f519-default-rtdb.firebaseio.com/timedata1.json")
            .then((response) => {
                if (response.data) {
                    setTimedata1(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    const revivalBack = () => {
        window.history.back();
    };
    return (
        <>
        <ArrowBackIcon className="backbutton" onClick={revivalBack}/>
        <div className="clockmange">

            {timedata1.map((time, index) => (
                <Link
                    key={index}
                    to={`${moviesURL}/${moviename[2]}/${time.id}`}
                    className="clockcard"
                >
                    <div
                        style={{
                            width: "20%",
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "20px",
                            marginBottom: "20px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                margin: "0",
                                color: "green",
                            }}
                        >
                            Start: {time.start}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
        </>
    );
};

export default ClockData;
