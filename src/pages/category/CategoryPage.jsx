import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryProducts, getCategoryProducts, removeCategoryProducts, statusCategoryRequest } from '../../redux/slice/categorySlice'
import ProductList from '../../components/productList/ProductList';
import Loader from '../../components/loader/Loader';
import { STATUS } from '../../constants/status';

function CategoryPage() {
   const { categoryName } = useParams();
   const dispatch = useDispatch();
   const products = useSelector(getCategoryProducts)
   const statusRequest = useSelector(statusCategoryRequest);


   useEffect(() => {
      dispatch(fetchCategoryProducts(categoryName))
      return () => {
         dispatch(removeCategoryProducts())
      }
   }, [categoryName])

   return (
      <div>
         {statusRequest === STATUS.LOADING && <Loader />}
         <ProductList products={products} title={categoryName} />
      </div>
   )
}

export default CategoryPage