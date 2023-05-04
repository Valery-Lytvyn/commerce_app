import { FaShopify } from 'react-icons/fa';
import './logo.scss';

function Logo() {
   return (
      <div className="logo">
         <div className="logoIcon">
            <FaShopify />
         </div>
         <span className='logoText'>HOP</span>
      </div>
   )
}

export default Logo