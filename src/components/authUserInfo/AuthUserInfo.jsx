import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, removeActiveUser } from '../../redux/slice/authSlice';
import { resetCart } from '../../redux/slice/cartSlice';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineLogout } from 'react-icons/md';
import { signOut } from 'firebase/auth';
import { ROUTES } from '../../routing/routes';
import { TYPE_TOAST } from '../../constants/typeToast';
import { auth } from '../../firebase.config';
import { capitalizeFirstLetter, notification } from '../../utils/utils';
import { firebaseErrorMessage } from '../../utils/firebaseErrorMessage';
import Loader from '../loader/Loader';
import './authUserInfo.scss';


function AuthUserInfo() {
   const [isLoading, setIsLoading] = useState(false);
   const userData = useSelector(getUserData);
   const dispatch = useDispatch();
   const [displayName, setDisplayName] = useState('');
   const [userPhoto, setUserPhoto] = useState(null)

   useEffect(() => {
      if (userData.userName != null && Object.keys(userData.userName).length) {
         const currentName = capitalizeFirstLetter(userData?.userName);
         setDisplayName(currentName);
      } else {
         setDisplayName('')
      }
      if (userData.userPhoto) {
         setUserPhoto(userData.userPhoto)
      }
   }, [userData])

   const logoutUser = () => {
      showLoader()
      signOut(auth).then(() => {
         hideLoader();
         dispatch(removeActiveUser())
         clearCart()
         notification('Logout successful.', TYPE_TOAST.SUCCESS)
      }).catch((error) => {
         hideLoader()
         const errorMessage = error.message
         firebaseErrorMessage(errorMessage)
      });
   }
   const showLoader = () => {
      setIsLoading(true)
   }
   const hideLoader = () => {
      setIsLoading(false)
   }

   const clearCart = () => {
      dispatch(resetCart());
   }
   return (
      <div className="authUserInfo p-1">
         {isLoading && <Loader />}
         {displayName.length ?
            <h6 className='displayName m-0'>hi, {displayName}</h6>
            : null
         }
         <Link to={ROUTES.login}>
            <div className="userIcon">
               {userPhoto ?
                  <img src={userPhoto} alt="user" /> :
                  <AiOutlineUser />
               }
            </div>
         </Link>
         {Object.keys(userData).length ?
            <div className="logout" onClick={logoutUser}>
               <MdOutlineLogout />
            </div>
            : null}
      </div>
   )
}

export default AuthUserInfo