import React from 'react';
import { motion } from 'framer-motion';
import { mottoData } from "../../constants/mottoData";
import './mottoBanner.scss';

function MottoBanner() {
   return (
      <div className="mottoBanner py-1">
         {mottoData.map((item, index) => (
            <motion.div
               initial={{ opacity: 0, }}
               animate={{ opacity: 1, }}
               transition={{
                  duration: 4,
                  type: 'tween',
               }}
               key={index}
            >
               <div key={index} className="motto p-2 my-2">
                  <div className="mottoIcon pe-4">
                     {item.icon}
                  </div>
                  <div className="mottoDescription">
                     <div className="mottoTitle">
                        {item.title}
                     </div>
                     <div className="mottoText">
                        {item.text}
                     </div>
                  </div>
               </div>
            </motion.div>))
         }
      </div>
   )
}

export default MottoBanner