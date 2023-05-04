import { PulseLoader } from 'react-spinners';
import './loader.scss'

function Loader() {
   return (
      <div className=' d-flex justify-content-center py-5'>
         <PulseLoader
            className='loader'
            size={10}
         />
      </div>
   )
}

export default Loader