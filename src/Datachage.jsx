  import React, { useEffect, useState } from 'react';
  import Bookticikmoel from './Bookticikmoel';
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
  import axios from 'axios';
  import { useLocation } from 'react-router';
  import movieList from "./movieList";

  const Datachage = () => {
    const [hoveredSeat, setHoveredSeat] = useState(null);
    const [checksitid,setchecksitid]=useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [olddata, setOldData] = useState([]);
    const location = useLocation();
    const movie = location.pathname;
    const moviename = movie.split('/');





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
            const a=[
              {
                id: 1,
                sets: []
              },
              {
                id: 2,
                sets: []
              },
            ]
            // Filter data based on movie name and ID
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
    };

    // Calculate the total price based on the selected seats
    const totalPrice = selectedSeats.reduce((total, seatId) => {
      const [serisname, seatIndex] = seatId.split('-');
      const movie = movieList.find((movie) => movie.serisname === serisname);
      if (movie) {
        return total + movie.price;
      }
      return total;
    }, 0);

    const revivalBack = () => {
      window.history.back();
    };

    const handleSeatHover = (serisname, seatIndex) => {
      const seatId = `${serisname}-${seatIndex}`;
      const seatData = olddata.find((item) => item.seats.includes(seatId));
      if (seatData) {
        setHoveredSeat(seatData.name);
        setchecksitid(seatId);
      } else {
        setHoveredSeat(null);
      }
    };



    return (
        <div>
          <ArrowBackIcon className="backbutton" onClick={revivalBack} />
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

                    const isSeatBooked = booksit.includes(seatId);
                    const isSeatSelected = selectedSeats.includes(seatId);

                    let seatClassName = 'seatdiv';
                    if (isSeatBooked) {
                      seatClassName += ' booked';
                    }
                    if (isSeatSelected) {
                      seatClassName += ' selected';
                    }

                    return (
                        <div
                            key={seatIndex}
                            className={seatClassName}
                            onClick={() => !isSeatBooked && handleSeatClick(movie.serisname, seatIndex + 1)}
                            onMouseEnter={() => handleSeatHover(movie.serisname, seatIndex + 1)}
                            onMouseLeave={() => setHoveredSeat(null)}
                        >
                          {seatIndex + 1}
                          {checksitid === seatId && <div className="hovered-seat-name">{hoveredSeat}</div>}
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

  export default Datachage;