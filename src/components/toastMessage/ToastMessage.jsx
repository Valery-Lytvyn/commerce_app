import { ToastContainer } from 'react-toastify';

function ToastMessage() {
   return (
      <>
         <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover

            // css style in App.css .Toastify__toast-theme--light
            theme="light"
         />
      </>
   )
}

export default ToastMessage