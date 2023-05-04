import React, { useState } from "react";
import ProductCard from "../productCard/ProductCard";
import Pagination from "../pagination/Pagination";
import { ITEMS_PER_PAGE } from "../../constants/const";
import './productList.scss';


function ProductList({ products, title }) {
   const [productsPerPage] = useState(ITEMS_PER_PAGE);
   const [currentPage, setCurrentPage] = useState(1);

   const pagesCount = Math.ceil(products.length / productsPerPage);
   const pages = [];
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
   }

   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

   const productList = products.slice(indexOfFirstProduct, indexOfLastProduct);

   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   return (
      <div className="productList">
         <div className="container">
            {title ?
               <div className="p-2">
                  <h2 className="pageTitle p-2">{title}</h2>
               </div>
               : null}
            <div className="products py-2">
               <div className="row">
                  {productList.map(product => (
                     <ProductCard productData={product} key={product.id} />
                  ))}
               </div>
            </div>
            <Pagination pages={pages} paginate={paginate} currentPage={currentPage} pagesCount={pagesCount} />
         </div>
      </div>
   )
}

export default ProductList