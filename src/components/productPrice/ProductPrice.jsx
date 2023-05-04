
import React from 'react';
import CountUp from 'react-countup';
import { currencyConversion, discountedPrice } from '../../utils/utils';
import './productPrice.scss';

function ProductPrice({ price, discount }) {
   return (
      <>
         <h6 className="priceOld">
            {currencyConversion(price)}
         </h6>
         <h5 className="discountedPrice">
            <CountUp
               end={discountedPrice(price, discount)}
               duration={1.2}
               separator=" "
               decimals={1.5}
               decimal="."
               prefix="$"
            />
         </h5>
      </>
   )
}

export default ProductPrice