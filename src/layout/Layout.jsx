import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ToastMessage from "../components/toastMessage/ToastMessage";

function Layout() {

   return (
      <>
         <Header />
         <div className="main">
            <div className="container-fluid container-lg">
               <Outlet />
            </div>
            <ToastMessage />
         </div>
         <Footer />
      </>
   )
}

export default Layout