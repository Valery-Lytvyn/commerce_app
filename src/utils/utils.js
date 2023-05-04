import { toast } from 'react-toastify';
import * as Scroll from 'react-scroll';


export const discountedPrice = (price, discount) => {
   return price - (price * discount * .01).toFixed(2)
}

export const currencyConversion = value => {
   if (value) {
      return `$${value.toFixed(2)}`
   }
}

export const notification = (text, type) => {
   toast(text, {
      type: type
   });
}
export const capitalizeFirstLetter = (string) => {
   if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }
}

export const scrollToTop = () => {
   let scroll = Scroll.animateScroll;
   scroll.scrollToTop({ delay: 0 });
}