import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchProducts, getSearchResults, clearSearchResults, getSearchStatus } from '../../redux/slice/searchSlice';
import Loader from '../../components/loader/Loader';
import ProductList from '../../components/productList/ProductList';
import { ImSad } from 'react-icons/im';
import './searchResultsPage.scss';
import { STATUS } from '../../constants/status';

function SearchResultsPage() {
   const { value } = useParams();
   const dispatch = useDispatch();
   const resultsSearch = useSelector(getSearchResults)
   const downloadStatus = useSelector(getSearchStatus);

   useEffect(() => {
      dispatch(clearSearchResults())
      dispatch(fetchSearchProducts(value))
   }, [value])

   return (
      <>
         {downloadStatus === STATUS.LOADING ? <Loader /> :
            <div className='resultsSearch'>
               {resultsSearch.length ?
                  < ProductList products={resultsSearch} title={`Search results: "${value}"`} />
                  :
                  <div className='searchInfo'>
                     <h4>Unfortunately, no products were found</h4>
                     <div className="sadFace">
                        <ImSad />
                     </div>
                  </div>
               }
            </div>
         }
      </>
   )
}

export default SearchResultsPage