import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, getCurrentProduct, removeProduct } from '../../redux/slice/currentProductSlice';
import Loader from '../../components/loader/Loader';
import ProductImages from '../../components/productImages/ProductImages';
import ProductPrice from '../../components/productPrice/ProductPrice';
import Counter from '../../components/counter/Counter';
import CustomBtn from '../../components/customBtn/CustomBtn';
import { addToCart } from '../../redux/slice/cartSlice';
import Rating from '../../components/rating/Rating';
import './singleProductPage.scss';

function SingleProductPage() {
   const { id } = useParams();
   const [counterValue, setCounterValue] = useState(1);
   const singleProduct = useSelector(getCurrentProduct);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchProduct(id));
      return () => {
         dispatch(removeProduct())
      }
   }, [])

   const { brand, category, description, discountPercentage: discount,
      thumbnail, price, rating, title
   } = singleProduct;


   const incrementQty = () => {
      setCounterValue((prev) => prev + 1)
   }

   const decrementQty = () => {
      if (counterValue > 1) {
         setCounterValue((prev) => prev - 1)
      }
   }

   const addProductToCart = () => {
      dispatch(addToCart({
         id: id,
         title: title,
         brand: brand,
         image: thumbnail,
         price: price,
         quantity: counterValue,
      }));
   }

   return (
      <div className='singleProduct'>
         <div className="container">
            {Object.keys(singleProduct).length ?
               <div className="row py-3">
                  <div className="col-sm-6 col-lg-4">
                     <ProductImages productImages={singleProduct.images}
                        title={title} />
                  </div>
                  <div className="col-sm-6 col-lg-8">
                     <div className="productSummary">
                        <h3 className='pb-3 productTitle'>{title}</h3>
                        <Rating rating={rating} />
                        <div className="productPrice py-3">
                           <ProductPrice price={price} discount={discount} />
                        </div>
                        <p className="description">
                           {description}
                        </p>
                        <p className="category">
                           Category:{' '}{category}
                        </p>
                     </div>
                     <div className="servicePart py-3">
                        <Counter
                           quantity={counterValue}
                           incrementQty={incrementQty}
                           decrementQty={decrementQty}
                        />
                        <div onClick={addProductToCart}>
                           <CustomBtn text='Add to cart' />
                        </div>
                     </div>
                  </div>
               </div>
               :
               <Loader />
            }
         </div>
      </div>
   )
}

export default SingleProductPage