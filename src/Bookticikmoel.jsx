import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import axios from 'axios';
import { useLocation } from "react-router-dom";

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

function Bookticikmoel({ totalPrice, selectedSeats, movieId }) {
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const movie = location.pathname;
    const moviename = movie.split("/");
    const [currentDate, setCurrentDate] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('en-GB')); // Format date as "date/month/year"
    }, []);

    const handelSubmit = async () => {
        const newData = {
            name: name,
            seats: selectedSeats,
            totalPrice: totalPrice,
            movieName: moviename[2],
            movieId: moviename[3],
            currentDate: currentDate,
        };

        try {
            await axios.post('https://alldatastorein-default-rtdb.firebaseio.com/moviedata.json', newData);
            setName(''); // Clear the name field
            handleClose();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="bookticit">
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
                        <TextField
                            id="outlined-basic"
                            label="Your Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <ul>
                            {selectedSeats.map((sitno) => (
                                <li key={sitno}>
                                    <EventSeatIcon />
                                    {sitno},
                                </li>
                            ))}
                        </ul>
                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                            Total price:₹{totalPrice}
                        </Typography>
                        <div>Date: {currentDate}</div><br></br>
                        <button className="submitbtn" onClick={handelSubmit}>
                            submit
                        </button>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default Bookticikmoel;
