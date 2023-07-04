import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import axios from 'axios';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate ,useLocation } from 'react-router-dom';
import Button from "@mui/material/Button";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function BookTicketModal({ totalPrice, selectedSeats, movieId }) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setuser] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const movie = location.pathname;
    const moviename = movie.split("/");
    console.log(loggedIn)
    const handleOpen = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("login");
                setuser(true)
            } else {
                console.log("log out");
                setuser(false)

            }
        });
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    console.log(user)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const auth = getAuth();

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

            })
            .catch((error) => {
                alert("Invalid credentials. Please try again.");
            });

        setFormData({
            email: "",
            password: ""
        });
    }







    const handelSubmit = async () => {
        const newData = {
            name: name,
            seats: selectedSeats,
            totalPrice: totalPrice,
            movieName: moviename[2],
            movieId: moviename[3],
            currentDate: new Date().toLocaleDateString('en-GB'),
        };

        try {
            await axios.post('https://alldatastorein-default-rtdb.firebaseio.com/moviedata.json', newData);
            setName('');
            handleClose();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="book-ticket">
                {totalPrice > 0 ? (
                    <button className="tickitbtn" onClick={handleOpen}>
                        Book Tickets
                    </button>
                ) : (
                    ''
                )}
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        {user ? (
                            <React.Fragment>
                                <TextField
                                    id="outlined-basic"
                                    label="Your Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <ul>
                                    {selectedSeats.map((seatNo) => (
                                        <li key={seatNo}>
                                            <EventSeatIcon />
                                            {seatNo},
                                        </li>
                                    ))}
                                </ul>
                                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                    Total price: ₹{totalPrice}
                                </Typography>
                                <div>Date: {new Date().toLocaleDateString('en-GB')}</div>
                                <br />
                                <button className="submitbtn" onClick={handelSubmit}>
                                    submit
                                </button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className="loginmange">
                                <Typography variant="h6">Please log in to book tickets</Typography>
                                <TextField
                                    label="email"
                                    className="emailcss"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="password"
                                    className="passwordcss"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                    <Button variant="contained" onClick={handleAccount}>
                                    Login
                                </Button>
                                    <Link to="/SignUp" style={{ display: "flex", justifyContent: "flex-end" }}>
                                        SignUp
                                    </Link>
                                </div>
                            </React.Fragment>
                        )}
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default BookTicketModal;
