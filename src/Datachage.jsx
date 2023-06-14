import React, { useState } from 'react';
import movieList from './movieList';

const Datachage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (serisname, seatIndex) => {
    const seatId = `${serisname}-${seatIndex}`;

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  // Calculate the total price based on the selected seats
  const totalPrice = selectedSeats.reduce((total, seatId) => {
    const [serisname, seatIndex] = seatId.split('-');
    const movie = movieList.find((movie) => movie.serisname === serisname);
    console.log(movie)
    if (movie) {
      return total + movie.price;
    }
    return total;
  }, 0);

  return (
      <div className='maindiv'>
        {movieList.map((movie, index) => (
            <div key={index} className='onlyserisname'>
              <div style={{ width: '50px', display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}>{movie.serisname}</div>

              {[...Array(movie.seat)].map((_, seatIndex) => {
                const seatId = `${movie.serisname}-${seatIndex}`;
                const isSeatSelected = selectedSeats.includes(seatId);
                return (
                    <div
                        key={seatIndex}
                        className={`seatdiv ${isSeatSelected ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(movie.serisname, seatIndex)}
                    >
                      {seatIndex + 1}
                    </div>
                );
              })}
            </div>
        ))}
        <div className='total-price'>
          Total Price: ₹{totalPrice}
        </div>
      </div>
  );
};

export default Datachage;
