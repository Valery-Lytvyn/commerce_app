export const ROUTES = {
   index: '/',
   product: (id = null) => (id ? `/product/${id}` : '/product/:id'),
   cart: '/cart',
   login: '/login',
   search: (value = null) => (value ? `/search/${value}` : '/search/:value'),
   category: (categoryName = null) => (categoryName ? `/category/${categoryName}` : '/category/:categoryName'),
}