import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { motion } from "framer-motion"
import { fetchData } from '../../fetch/fetchData';
import { BASE_URL } from '../../constants/url';
import { ROUTES } from '../../routing/routes';
import './categoriesMenu.scss';


function CategoriesMenu({ closeMenu }) {
   const [categoryArr, setCategoryArr] = useState([]);
   const navigator = useNavigate();

   useEffect(() => {
      (async () => {
         const data = await fetchData(`${BASE_URL}${'categories'}`);
         setCategoryArr(...categoryArr, data)
      })();
   }, [])

   const handleClickMenuItem = (e, value) => {
      e.stopPropagation();
      navigator(ROUTES.category(value))
      closeMenu()
   }

   return (
      <div className="categoriesMenuWrap"
         onClick={closeMenu}>
         <motion.div className='categoriesMenu'
            key="modal"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2 }}
         >
            <div className="closeBtn">
               <GrClose />
            </div>
            <h3 className='categoriesMenuTitle p-2'>
               Categories
            </h3>
            <ul>
               {categoryArr.map((item, index) => (
                  <li className='category p-2 px-4' key={index}
                     onClick={(e) => handleClickMenuItem(e, item)}
                  >
                     <h5>
                        {item}
                     </h5>
                  </li>
               ))}
            </ul>
         </motion.div>
      </div >
   )
}

export default CategoriesMenu