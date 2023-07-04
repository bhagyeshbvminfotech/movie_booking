import React, { useEffect, useState } from 'react';
import Bookticikmoel from './Bookticikmoel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useLocation } from 'react-router';
import movieList from "./movieList";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {moviesURL} from "./constant";
import { useNavigate } from 'react-router-dom';
import User from "./User";
import Sithide from "./Sithide";

const MovieSit = () => {
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [checksitid, setchecksitid] = useState(null);
  const [date, setdate] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [olddata, setOldData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const movie = location.pathname;
  const moviename = movie.split('/');


  console.log(Sithide)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://alldatastorein-default-rtdb.firebaseio.com/moviedata.json');
        const data = response.data;
        if (data) {
          const parsedData = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          const filteredData = parsedData.filter((item) => item.movieName === moviename[2] && item.movieId === moviename[3]);

          setOldData(filteredData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const booksit = Array.isArray(olddata) ? olddata.reduce((seats, obj) => [...seats, ...obj.seats], []) : [];

  const handleSeatClick = (serisname, seatIndex) => {
    const seatId = `${serisname}-${seatIndex}`;

    if (selectedSeats.length >= 10 && !selectedSeats.includes(seatId)) {
      setErrorMessage('Maximum limit of 10 seats reached');
      return;
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });

    setErrorMessage('');
    setHoveredSeat(null);
    setAnchorEl(null);
  };

  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const [serisname, seatIndex] = seatId.split('-');
    const movie = movieList.find((movie) => movie.serisname === serisname);
    if (movie) {
      return total + movie.price;
    }
    return total;
  }, 0);

  const navigate = useNavigate();
  const revivalBack = () => {
    navigate(`${moviesURL}/${moviename[0]}${moviename[2]}`);
  };

  const handleSeatHover = (serisname, seatIndex, event) => {
    const seatId = `${serisname}-${seatIndex}`;
    const seatData = olddata.find((item) => item.seats.includes(seatId));
    if (seatData) {
      setHoveredSeat(seatData.name);
      setchecksitid(seatId);
      setAnchorEl(event.currentTarget);
      setdate(seatData.currentDate);
    } else {
      setHoveredSeat(null);
      setAnchorEl(null);
    }
  };

  const handleClosePopover = () => {
    setHoveredSeat(null);
    setAnchorEl(null);
  };

  return (
      <div>
        <div className="usercompo">
          <ArrowBackIcon className="backbutton" onClick={revivalBack}/>
          <User/>
        </div>
        <div className="maindiv">
          {movieList.map((movie, index) => (
              <div key={index} className="onlyserisname">
                <div
                    style={{
                      width: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                >
                  {movie.serisname}
                </div>

                {[...Array(movie.seat)].map((_, seatIndex) => {
                  const seatId = `${movie.serisname}-${seatIndex + 1}`;
                  const isSeatHidden = Sithide.includes(seatId);

                  const isSeatBooked = booksit.includes(seatId);
                  const isSeatSelected = selectedSeats.includes(seatId);

                  let seatClassName = 'seatdiv';
                  if (isSeatBooked) {
                    seatClassName += ' booked';
                  }
                  if (isSeatSelected) {
                    seatClassName += ' selected';
                  }
                  if (isSeatHidden) {
                    seatClassName += ' hidden';
                  }

                  return (
                      <div
                          key={seatIndex}
                          className={seatClassName}
                          onClick={() => !isSeatBooked && handleSeatClick(movie.serisname, seatIndex + 1)}
                          onMouseEnter={(event) => handleSeatHover(movie.serisname, seatIndex + 1, event)}
                          onMouseLeave={handleClosePopover}
                      >
                        {seatIndex + 1}
                        {checksitid === seatId && (
                            <Popover
                                id="mouse-over-popover"
                                sx={{
                                  pointerEvents: 'none',
                                }}
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                                onClose={handleClosePopover}
                                disableRestoreFocus
                            >
                              <Typography sx={{ p: 1 }}>Name:{hoveredSeat}</Typography>
                              <Typography sx={{ p: 1 }}>No:{seatId}</Typography>
                              <Typography sx={{ p: 1 }}>date:{date}</Typography>
                            </Popover>
                        )}
                      </div>
                  );
                })}
              </div>
          ))}
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="total-price">Total Price: ₹{totalPrice}</div>
        <Bookticikmoel totalPrice={totalPrice} selectedSeats={selectedSeats} />
      </div>
  );
};

export default MovieSit;
