import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import CustomBtn from '../customBtn/CustomBtn';
import { scrollToTop } from '../../utils/utils';
import './pagination.scss';

function Pagination({ pages, paginate, currentPage, pagesCount }) {

   const prevPage = () => {
      if (currentPage !== 1) {
         paginate(currentPage - 1)
         scrollToTop();
      }
   }
   const nextPage = () => {
      if (currentPage < pagesCount) {
         paginate(currentPage + 1)
         scrollToTop();
      }
   }
   const clickHandler = (item) => {
      paginate(item);
      scrollToTop();
   }
   return (
      <div className='pagination'>
         {pagesCount === 1 ? null :
            <>
               <div className="arrowBtn p-2 m-1"
                  onClick={prevPage}
               >
                  <MdArrowBackIos />
               </div>
               {pages.map(item => (
                  <div className={currentPage === item ? 'activePage' : null} key={item}
                     onClick={() => { clickHandler(item) }}
                  >
                     <CustomBtn text={item} />
                  </div>
               ))}
               <div className="arrowBtn p-2 m-1"
                  onClick={nextPage}
               >
                  <MdArrowForwardIos />
               </div>
            </>
         }
      </div>
   )
}

export default Pagination