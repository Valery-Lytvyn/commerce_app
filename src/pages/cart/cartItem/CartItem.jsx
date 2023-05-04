import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoTrashcan } from 'react-icons/go';
import { countSum, decrementQuantity, incrementQuantity, removeItem } from '../../../redux/slice/cartSlice';
import CustomBtn from '../../../components/customBtn/CustomBtn';
import { currencyConversion } from '../../../utils/utils';
import Counter from '../../../components/counter/Counter';
import { ROUTES } from '../../../routing/routes';
import './cartItem.scss';
import LazyImage from '../../../components/lazyImage/LazyImage';

function CartItem({ itemData }) {
   const dispatch = useDispatch();

   const { id, image, title, brand, price, quantity, total
   } = itemData;

   const incrementQty = () => {
      dispatch(incrementQuantity({
         id: id,
      }));
   }

   const decrementQty = () => {
      if (quantity === 1) {
         dispatch(removeItem({
            id: id,
         }))
      } else {
         dispatch(decrementQuantity({
            id: id,
         }));
      }
   }

   useEffect(() => {
      dispatch(countSum({
         id: id,
      }));
   }, [quantity])

   const removeProduct = () => {
      dispatch(removeItem({
         id: id,
      }))
   }

   return (
      <div className='cartItem'>
         <div className="row align-items-center py-3 border-sm-bottom">
            <div className="col-sm-5 pb-3 pb-sm-0">
               <Link to={ROUTES.product(id)}>
                  <div className="itemCard">
                     <div className="itemImg">
                        <LazyImage src={image} alt={title} />
                     </div>
                     <div className="itemDescription px-2">
                        <h5 className="itemName">
                           {title}
                        </h5>
                        <h6 className="itemNameBrand">
                           {brand}
                        </h6>
                     </div>
                  </div>
               </Link>
            </div>
            <div className="col-4 col-sm-2">
               <h6 className='cost'>
                  {currencyConversion(price)}
               </h6>
            </div>
            <div className="col-4 col-sm-3 d-flex justify-content-center align-items-center">
               <Counter
                  id={id}
                  quantity={quantity}
                  incrementQty={incrementQty}
                  decrementQty={decrementQty}
               />
               <div className="trashBtn ms-2" onClick={removeProduct}>
                  <CustomBtn text={<GoTrashcan />} />
               </div>
            </div>
            <div className="col-4 col-sm-2">
               <h6 className="cost">
                  {currencyConversion(total)}
               </h6>
            </div>
         </div>
      </div >
   )
}

export default CartItem