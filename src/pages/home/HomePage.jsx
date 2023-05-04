import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, getAllProducts, getStatusRequest } from "../../redux/slice/productsSlice";
import { STATUS } from "../../constants/status";
import Loader from "../../components/loader/Loader";
import ProductList from "../../components/productList/ProductList";
import MottoBanner from "../../components/mottoBanner/MottoBanner";


function HomePage() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchProducts());
   }, []);

   const products = useSelector(getAllProducts);
   const statusRequest = useSelector(getStatusRequest);


   return (
      <div className="home">
         {statusRequest === STATUS.LOADING && <Loader />}
         <MottoBanner />
         {products && <ProductList products={products} title={'See our products'} />}
      </div >
   )
}

export default HomePage