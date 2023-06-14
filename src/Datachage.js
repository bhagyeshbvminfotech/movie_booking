import React from 'react';
import movieList from './movieList';

const Datachage = () => {
  console.log(movieList);

  const handelsitClick = (seatIndex) => {
    console.log(seatIndex)
  }
  return (
    <div className='maindiv'>
      {movieList.map((movie, index) => (
        <div key={index} className='onlyserisname'>
          {movie.serisname}
          {[...Array(movie.seat)].map((_, seatIndex) => (
            <div key={seatIndex} className='seatdiv' onClick={() => handelsitClick(seatIndex + 1)}>{seatIndex + 1} </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Datachage;
