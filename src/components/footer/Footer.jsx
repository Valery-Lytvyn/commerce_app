import React from 'react';
import Logo from "../../components/logo/Logo"
import { locationData, socialMediaIcons } from '../../constants/footerData'
import { scrollToTop } from '../../utils/utils';
import './footer.scss'



function Footer() {

   return (
      <div className="footer">
         <div className="footerInfo py-2">
            <div onClick={scrollToTop}>
               <Logo />
            </div>
            <div className="infoText py-2">
               © Copyright 2023
            </div>
         </div>
         <div className="socialMediaIcons">
            {socialMediaIcons.map((item, index) => (
               <a href={item.link} target="_blank" rel="noreferrer" key={index}>
                  <div className="p-2">
                     {item.icon}</div>
               </a>
            ))
            }
         </div>
         <div className="location py-2">
            <div className="locationTitle py-1">
               Locate us
            </div>
            <ul className="m-0 p-0">
               {locationData.map((item, index) => (
                  <li key={index}>{item}</li>
               ))
               }
            </ul>
         </div>
      </div>
   )
}

export default Footer