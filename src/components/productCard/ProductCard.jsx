import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LazyImage from '../lazyImage/LazyImage';
import { discountedPrice } from '../../utils/utils';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { addToCart } from '../../redux/slice/cartSlice';
import { ROUTES } from '../../routing/routes';
import ProductPrice from '../productPrice/ProductPrice';
import './productCard.scss';


function ProductCard({ productData }) {
   const [showElement, setShowElement] = useState(false);
   const navigator = useNavigate();
   const dispatch = useDispatch();
   const { id, thumbnail, title, brand, price,
      discountPercentage: discount, category,
   } = productData

   const priceNew = discountedPrice(price, discount);

   const mouseEnter = () => {
      setShowElement(true);
   }

   const mouseLeave = () => {
      setShowElement(false);
   }

   const addProductToCart = (e) => {
      e.preventDefault();
      dispatch(addToCart({
         id: id,
         title: title,
         brand: brand,
         image: thumbnail,
         price: priceNew,
         quantity: 1,
      }));
   }
   const handleClickLink = (e, linkName) => {
      e.preventDefault();
      navigator(ROUTES.category(linkName));
   }


   return (

      <div className="col-sm-6 col-md-4 col-lg-3 p-2 d-flex justify-content-center d-sm-block">
         <Link to={ROUTES.product(id)}>
            < div className="productCard"
               onMouseEnter={mouseEnter}
               onMouseLeave={mouseLeave}
            >
               <div className="productImg">
                  <LazyImage src={thumbnail} alt={title} />
               </div>
               <h5 className="productBrand p-2">
                  {brand}
               </h5>
               <h5 className="productTitle p-2">
                  {title}
               </h5>
               <div className="productPrice p-2">
                  <ProductPrice price={price} discount={discount} />
               </div>
               <div className="category px-3 py-1" onClick={(e) => handleClickLink(e, category)}>
                  {category}
               </div>
               <h6 className="discount px-3 py-1">
                  -{discount}%
               </h6>
               {showElement &&
                  <div className="cartIcon" onClick={addProductToCart}>
                     < MdOutlineAddShoppingCart />
                  </div>
               }
            </div>
         </Link >
      </div>

   )
}

export default ProductCard