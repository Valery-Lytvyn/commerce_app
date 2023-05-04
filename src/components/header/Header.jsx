import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routing/routes';
import { BsHandbag } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { HiMenuAlt1 } from 'react-icons/hi';
import Logo from '../../components/logo/Logo';
import { getQuantity } from '../../redux/slice/cartSlice';
import SearchBar from '../../components/searchBar/SearchBar';
import CategoriesPage from '../../components/categoriesMenu/CategoriesMenu';
import AuthUserInfo from '../authUserInfo/AuthUserInfo';
import './header.scss';


function Header() {
   const [showMenu, setShowMenu] = useState(false);
   const totalQty = useSelector(getQuantity);

   const openMenu = () => {
      setShowMenu(true)
   }

   const closeMenu = () => {
      setShowMenu(false)
   }

   return (
      <div className="header pt-1">
         <div className="container-fluid">
            <div className="row">
               <div className="col-sm-3 p-0 p-sm-3">
                  <Link to={ROUTES.index}>
                     <Logo />
                  </Link>
               </div>
               <div className="col-sm-9">
                  <div className="serviceIcons">
                     <AuthUserInfo />
                     <Link to={ROUTES.cart}>
                        <div className="cartIcon p-1">
                           < BsHandbag />
                           <div className="cartValue">
                              {totalQty > 0 ?
                                 totalQty
                                 : null}
                           </div>
                        </div>
                     </Link>
                  </div>
               </div>
               <div className="col-3  py-3">
                  <div className="categoriesMenu" onClick={openMenu}>
                     <HiMenuAlt1 />
                  </div>
                  {showMenu ? <CategoriesPage closeMenu={closeMenu} /> : null}
               </div>
               <div className="col-9">
                  <SearchBar />
               </div>
            </div>
         </div>
      </div >
   )
}

export default Header