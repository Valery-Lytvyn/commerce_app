import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import { calcAmount, getCartData, getPurchasePrice, resetCart } from '../../redux/slice/cartSlice';
import CartItem from './cartItem/CartItem';
import CustomBtn from '../../components/customBtn/CustomBtn';
import { ROUTES } from '../../routing/routes';
import './cartPage.scss';

function CartPage() {
   const dispatch = useDispatch();
   const allAddedProducts = useSelector(getCartData);
   const totalSum = useSelector(getPurchasePrice);

   useEffect(() => {
      dispatch(calcAmount());
   })

   const clearCart = () => {
      dispatch(resetCart());
   }

   return (
      <div className='cart py-3'>
         <div className="container">
            <Link to={ROUTES.index}>
               <div className='cartBtn py-2 p-sm-0'>
                  <CustomBtn text='Continue Shopping' />
               </div>
            </Link>
            {allAddedProducts.length === 0 ?
               <h3 className='text-center'>Your cart is empty</h3>
               :
               <>
                  <div className="row pt-3 border-bottom d-none d-sm-flex ">
                     <div className="col-5">
                        <h6 className='titleTableCart'>product</h6>
                     </div>
                     <div className="col-2">
                        <h6 className='titleTableCart'>price</h6>
                     </div>
                     <div className="col-3">
                        <h6 className='titleTableCart'>quantity</h6>
                     </div>
                     <div className="col-2">
                        <h6 className='titleTableCart'>total</h6>
                     </div>
                  </div>
                  {allAddedProducts.map(item => (
                     <CartItem itemData={item} key={item.id} />
                  ))}
                  <div className="row py-3 border-top border-sm-none">
                     <div className="col-sm-6 order-1 order-sm-0">
                        <div onClick={clearCart} className='cartBtn py-2 p-sm-0'>
                           <CustomBtn text='Clear Cart' />
                        </div>
                     </div>
                     <div className="col-sm-6 d-flex align-items-end flex-column order-0 order-sm-1">
                        <div className="totalSum pb-2">
                           <h5>Total: </h5>
                           <h6 className='cost'>
                              <CountUp
                                 end={totalSum}
                                 duration={1.2}
                                 separator=" "
                                 decimals={2}
                                 decimal="."
                                 prefix="$"
                              />
                           </h6>
                        </div>
                        <div className='cartBtn py-2 p-sm-0' onClick={clearCart}>
                           <CustomBtn text='Check Out' />
                        </div>
                     </div>
                  </div>
               </>
            }
         </div>
      </div>
   )
}

export default CartPage