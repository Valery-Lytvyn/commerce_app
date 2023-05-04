import React from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import './counter.scss';

function Counter({ quantity, incrementQty, decrementQty }) {

   return (
      <>
         <div className='quantity border'>
            <h6 className='px-3 m-0'>
               {quantity}
            </h6>
            <div className="counterButtons p-0">
               <div className="increment px-1" onClick={incrementQty}>
                  <BiPlus />
               </div>
               <div className="decrement  px-1" onClick={decrementQty}>
                  <BiMinus />
               </div>
            </div>
         </div>
      </>
   )
}

export default Counter