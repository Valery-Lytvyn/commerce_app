import { createHashRouter } from "react-router-dom";
import loadable from '@loadable/component';
import { ROUTES } from "./routes";
import { fetchProducts } from "../redux/slice/productsSlice";


const HomePage = loadable(() => import('../pages/home/HomePage'));
const Layout = loadable(() => import('../layout/Layout'));
const Cart = loadable(() => import('../pages/cart/CartPage'));
const SingleProduct = loadable(() => import('../pages/singleProduct/SingleProductPage'));
const ErrorPage = loadable(() => import('../pages/errorPage/ErrorPage'));
const SearchResultsPage = loadable(() => import('../pages/searchResults/SearchResultsPage'));
const CategoryPage = loadable(() => import('../pages/category/CategoryPage'));
const LoginPage = loadable(() => import('../pages/login/LoginPage'));


export const router = createHashRouter([
   {
      path: ROUTES.index,
      element: <Layout />,
      errorElement: <ErrorPage />,

      children: [
         {
            index: true,
            element: <HomePage />,
            loader: fetchProducts,
         },
         {
            path: ROUTES.product(),
            element: <SingleProduct />,
         },
         {
            path: ROUTES.cart,
            element: <Cart />
         },
         {
            path: ROUTES.login,
            element: <LoginPage />
         },
         {
            path: ROUTES.search(),
            element: <SearchResultsPage />
         },
         {
            path: ROUTES.category(),
            element: <CategoryPage />
         },
      ]
   }
])