import React from 'react';
import './customBtn.scss';

function CustomBtn({ text }) {
   return (
      <button className="customBtm px-3 py-1" >
         <h6 className='m-0'>{text}</h6>
      </button>
   )
}

export default CustomBtn