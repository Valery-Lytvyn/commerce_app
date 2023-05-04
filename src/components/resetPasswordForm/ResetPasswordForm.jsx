import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { firebaseErrorMessage } from '../../utils/firebaseErrorMessage';
import { notification } from '../../utils/utils';
import { TYPE_TOAST } from '../../constants/typeToast';

function ResetPasswordForm({ toggleForm, showLoader, hideLoader }) {
   const [email, setEmail] = useState('');
   const resetPassword = (e) => {
      e.preventDefault();
      showLoader()
      sendPasswordResetEmail(auth, email)
         .then(() => {
            hideLoader()
            notification('Check your email for the reset link', TYPE_TOAST.SUCCESS)
            setEmail('')
         })
         .catch((error) => {
            hideLoader()
            const errorMessage = error.message;
            firebaseErrorMessage(errorMessage);
         });
   }
   return (
      <div className='loginForm pt-2 pb-1'>
         <h3 className='pageTitle py-2'>Reset Password</h3>
         <form className='SignInForm' onSubmit={resetPassword}>
            <div className='inputWrap py-3'>
               <label htmlFor="email">email:</label>
               {' '}
               <input
                  type="email"
                  name='email'
                  value={email}
                  placeholder='youremail@mail.com'
                  id='email'
                  onChange={e => setEmail(e.target.value)}
               />
            </div>
            <button type='submit' className="loginBtn signUpBtn p-0">
               <h4>Reset Password</h4>
            </button>
         </form>
         <div className="questionLinkWrap pt-4 ">
            <h6 className='questionLink' onClick={() => toggleForm('login')}>Already have an account? Login here.</h6>
            <h6 className="questionLink" onClick={() => toggleForm('registration')}>Don`t have an account? Register here.</h6>
         </div>

      </div>
   )
}

export default ResetPasswordForm