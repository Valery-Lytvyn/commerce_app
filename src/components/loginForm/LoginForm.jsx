import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase.config';
import { firebaseErrorMessage } from '../../utils/firebaseErrorMessage';
import { TYPE_TOAST } from '../../constants/typeToast';
import { notification } from '../../utils/utils';
import { ROUTES } from '../../routing/routes';
import { setActiveUser } from '../../redux/slice/authSlice';


function LoginForm({ toggleForm, showLoader, hideLoader }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate()
   const dispatch = useDispatch();

   const loginUser = (e) => {
      e.preventDefault();
      if ((email.length || password.length) === 0) {
         notification('please fill in all fields', TYPE_TOAST.ERROR);
      } else {
         showLoader();
         signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               const user = userCredential.user;
               setEmail('')
               setPassword('')
               successfulResultHandler(user)
            })
            .catch((error) => {
               hideLoader();
               const errorMessage = error.message;
               firebaseErrorMessage(errorMessage);
            });
      }
   }

   const provider = new GoogleAuthProvider();

   const signInWithGoogle = () => {
      showLoader()
      signInWithPopup(auth, provider)
         .then((result) => {
            const user = result.user;
            successfulResultHandler(user)
         }).catch((error) => {
            hideLoader();
            const errorMessage = error.message;
            firebaseErrorMessage(errorMessage);
         });
   }

   const successfulResultHandler = (userInfo) => {
      hideLoader();
      notification('login successful', TYPE_TOAST.SUCCESS);
      dispatch(setActiveUser({
         userPhoto: userInfo.photoURL,
         email: userInfo.email,
         userName: userInfo.displayName,
         userId: userInfo.uid,
      }))
      navigate(ROUTES.index)
   }

   return (
      <div className='loginForm pt-2 pb-1'>
         <h3 className='pageTitle py-2'>Sign in now</h3>
         <div className="loginBtn px-3 py-2" onClick={signInWithGoogle}>
            <div className="loginBtnIcon">
               <FcGoogle />
            </div>
            <h4 className='m-0'>Google</h4>
         </div>
         <h6 className='offerText py-3'>
            <span className='px-2 fw-normal'>or sign in with email</span>
         </h6>
         <form className='SignInForm' onSubmit={loginUser}>
            <div className='inputWrap'>
               <div className='inputGroup px-2 '>
                  <label htmlFor="email">email:</label>
                  <input
                     type="email"
                     name='email'
                     value={email}
                     placeholder='youremail@mail.com'
                     id='email'
                     onChange={e => setEmail(e.target.value)}
                  />
               </div>
               <div className='inputGroup px-2 '>
                  <label htmlFor="password">password:</label>
                  <input
                     type="password"
                     name='password'
                     value={password}
                     autoComplete="on"
                     placeholder='********'
                     id='password'
                     onChange={e => setPassword(e.target.value)}
                  />
               </div>
            </div>
            <button type='submit' className="loginBtn signUpBtn p-0">
               <h4>Login</h4>
            </button>
         </form>
         <div className="questionLinkWrap pt-4">
            <h6 className="questionLink" onClick={() => toggleForm('registration')}>Don`t have an account? Register here.</h6>
            <h6 className="questionLink" onClick={() => toggleForm('resetPassword')}>Forgot your password? Reset here.</h6>
         </div>
      </div>
   )
}

export default LoginForm