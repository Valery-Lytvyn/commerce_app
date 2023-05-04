import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const LazyImage = ({ src, alt }) => (
   <>
      <LazyLoadImage
         alt={alt}
         src={src}
         effect="opacity"
         width={'100%'}
         height={'100%'}

      />
   </>
);

export default LazyImage;