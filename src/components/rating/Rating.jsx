import React from 'react';
import StarRatings from 'react-star-ratings';

function Rating({ rating }) {
   return (
      <div className="rating">
         <StarRatings
            rating={rating}
            starDimension="20px"
            starSpacing="5px"
            starEmptyColor='#c9c9c9'
            starRatedColor='#ff9100'
         />
         <div className="ratingDescription">
            {rating}{' '}/{' '}5
         </div>
      </div>
   )
}

export default Rating