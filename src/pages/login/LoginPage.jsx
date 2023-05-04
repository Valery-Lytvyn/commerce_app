import React, { useState } from 'react'
import Loader from '../../components/loader/Loader';
import RegisterForm from '../../components/registerForm/RegisterForm';
import LoginForm from '../../components/loginForm/LoginForm';
import ResetPasswordForm from '../../components/resetPasswordForm/ResetPasswordForm';
import './loginPage.scss';

function LoginPage() {
   const [currentForm, setCurrentForm] = useState('login')
   const [isLoading, setIsLoading] = useState(false);

   const toggleForm = (formName) => {
      setCurrentForm(formName)
   }

   const showLoader = () => {
      setIsLoading(true)
   }
   const hideLoader = () => {
      setIsLoading(false)
   }

   const renderSwitch = (param) => {
      switch (param) {
         case 'login':
            return (
               <LoginForm toggleForm={toggleForm} showLoader={showLoader} hideLoader={hideLoader} />
            );
         case 'registration':
            return (
               <RegisterForm toggleForm={toggleForm} showLoader={showLoader} hideLoader={hideLoader} />
            );
         case 'resetPassword':
            return (
               <ResetPasswordForm toggleForm={toggleForm} showLoader={showLoader} hideLoader={hideLoader} />
            );
         default: return null;
      }
   }

   return (
      <div className='loginPage'>
         {isLoading && <Loader />}
         {renderSwitch(currentForm)}
      </div>
   )
}

export default LoginPage