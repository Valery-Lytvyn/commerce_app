import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { ROUTES } from '../../routing/routes';
import './searchBar.scss';

function SearchBar() {
   const [searchRequest, setSearchRequest] = useState('');
   const [showPlaceholderText, setShowPlaceHolderText] = useState(false);
   const navigate = useNavigate();

   const handleSearchInput = (e) => {
      setSearchRequest(e.target.value)
   }

   const handleSearchBtn = (e) => {
      e.preventDefault();
      if (searchRequest.length >= 3) {
         navigate(ROUTES.search(searchRequest))
         setSearchRequest('')
         setShowPlaceHolderText(false)
      } else {
         setShowPlaceHolderText(true)
      }
   }

   return (
      <div className="search p-1">
         <form type='submit' onSubmit={handleSearchBtn}>
            <input
               type="text"
               className='searchInput'
               value={searchRequest}
               onChange={handleSearchInput}
               placeholder={showPlaceholderText ? 'enter product name' : null}
            />
            <button className='searchBtn px-2'> <BsSearch /> </button>
         </form>
         {(searchRequest && searchRequest.length < 3) ?
            <h6 className='inputWarning'>
               Enter at least 3 characters
            </h6>
            : null
         }
      </div >
   )
}

export default SearchBar