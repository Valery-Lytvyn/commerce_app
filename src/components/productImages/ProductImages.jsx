import React, { useState } from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import './productImages.scss';
import LazyImage from '../lazyImage/LazyImage';

function ProductImages({ productImages, title }) {
   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const choiceImage = (index) => {
      setCurrentImageIndex(index)
   }

   const lengthImagesArr = productImages.length - 1;

   const backStep = () => {
      currentImageIndex === 0 ? setCurrentImageIndex(lengthImagesArr) : setCurrentImageIndex((prev) => prev - 1)
   }
   const forwardStep = () => {
      currentImageIndex === lengthImagesArr ? setCurrentImageIndex(0) : setCurrentImageIndex((prev) => prev + 1)
   }

   return (
      <div className="productImagePart">
         <div className="selectedImage border-bottom py-2">
            <LazyImage src={productImages[currentImageIndex]} alt={title} />
            <div className="prevArrow arrowBtn p-2" onClick={backStep}>
               <MdArrowBackIos />
            </div>
            <div className="nextArrow arrowBtn p-2" onClick={forwardStep}>
               <MdArrowForwardIos />
            </div>
         </div>
         <div className="previewImageList py-2">
            {productImages.map((item, index) => (
               <div className="previewImage p-2" key={index}
                  onClick={() => choiceImage(index)}
               >
                  <LazyImage src={item} alt={`${title} ${index}`} />
               </div>
            ))}
         </div>
      </div>
   )
}

export default ProductImages