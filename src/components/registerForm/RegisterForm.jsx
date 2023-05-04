import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { notification } from '../../utils/utils';
import { TYPE_TOAST } from '../../constants/typeToast';
import { firebaseErrorMessage } from '../../utils/firebaseErrorMessage';

function RegisterForm({ toggleForm, showLoader, hideLoader }) {
   const [userName, setUserName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');

   const signUpUser = (e) => {
      e.preventDefault();
      if ((userName.length || email.length || password.length || passwordConfirm.length) === 0) {
         notification('please fill in all fields', TYPE_TOAST.ERROR)
      }
      else if ((password.length && passwordConfirm.length) < 6) {
         notification('The password must be at least 6 characters in length', TYPE_TOAST.INFO)
      }
      else if (password !== passwordConfirm) {
         notification('passwords do not match', TYPE_TOAST.ERROR)
      }
      else {
         showLoader()
         createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
               hideLoader();
               setUserName('')
               setEmail('')
               setPassword('')
               setPasswordConfirm('')
               notification('Registration was successful', TYPE_TOAST.SUCCESS);
            })
            .then(() => {
               updateProfile(auth.currentUser, {
                  displayName: userName
               });
               toggleForm('login');
            })
            .catch((error) => {
               hideLoader()
               const errorMessage = error.message
               firebaseErrorMessage(errorMessage)
            });
      }
   }


   return (
      <div className='registerForm pt-2 pb-1'>
         <h3 className='pageTitle py-2'>Sign Up Now</h3>
         <form className='SignUpForm ' onSubmit={signUpUser}>
            <div className='inputWrap py-4'>
               <div className='inputGroup px-2 '>
                  <label htmlFor="name">name:</label>
                  <input
                     type="text"
                     name='name'
                     value={userName}
                     placeholder='your name'
                     id='userName'
                     onChange={e => setUserName(e.target.value)}
                  />
               </div>
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
               <div className='inputGroup px-2 '>
                  <label htmlFor="passConfirm">confirm password:</label>
                  <input
                     type="password"
                     name='passwordConfirm'
                     value={passwordConfirm}
                     autoComplete="on"
                     placeholder='********'
                     id='passwordConfirm'
                     onChange={e => setPasswordConfirm(e.target.value)}
                  />
               </div>
            </div>
            <button type='submit' className="loginBtn signUpBtn p-0">
               <h4>Register Now</h4>
            </button>
         </form>
         <h6 className='questionLink pt-4' onClick={() => toggleForm('login')}>Already have an account? Login here.</h6>
      </div>
   )
}

export default RegisterForm