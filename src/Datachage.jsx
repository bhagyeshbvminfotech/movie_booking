import React, {useEffect, useState} from 'react';
import movieList from './movieList';
import Bookticikmoel from "./Bookticikmoel";

const Datachage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [olddata, setOldData] = useState();

  console.log(olddata)
  useEffect(() => {
    const storedData = localStorage.getItem('moviedata');

    if (storedData) {
      setOldData(JSON.parse(storedData));
    }
  }, []);

  const handleSeatClick = (serisname, seatIndex) => {
    const seatId = `${serisname}-${seatIndex}`;

    if (selectedSeats.length >= 10 && !selectedSeats.includes(seatId)) {
      setErrorMessage("Maximum limit of 10 seats reached");
      return;
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });

    setErrorMessage("");
  };

  // Calculate the total price based on the selected seats
  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const [serisname, seatIndex] = seatId.split('-');
    const movie = movieList.find((movie) => movie.serisname === serisname);
    // console.log(movie)
    if (movie) {
      return total + movie.price;
    }
    return total;
  }, 0);

  return (
      <div>

      <div className='maindiv'>
        {movieList.map((movie, index) => (
            <div key={index} className='onlyserisname'>
              <div style={{ width: '50px', display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}>{movie.serisname}</div>

              {[...Array(movie.seat)].map((_, seatIndex) => {
                const seatId = `${movie.serisname}-${seatIndex+1}`;
                const isSeatSelected = selectedSeats.includes(seatId);
                return (
                    <div
                        key={seatIndex}
                        className={`seatdiv ${isSeatSelected ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(movie.serisname, seatIndex+1)}
                    >
                      {seatIndex + 1}
                    </div>
                );
              })}
            </div>
        ))}
      </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className='total-price'>
          Total Price: ₹{totalPrice}
        </div>
      <Bookticikmoel totalPrice={totalPrice} selectedSeats={selectedSeats}/>
      </div>
  );
};

export default Datachage;
