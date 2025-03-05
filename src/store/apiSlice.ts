import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// สร้าง API Service
export const apiSlice = createApi({
  reducerPath: 'api', // กำหนดชื่อ reducer
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.0.2.2:3000' }),
  endpoints: (builder) => ({
    // Fetch Products
    getProducts: builder.query({
      query: () => '/products', // Endpoint
    }),
    // Fetch Trending Items
    getTrending: builder.query({
      query: () => '/Trending', // Endpoint
    }),
    // Fetch Brands
    getBrands: builder.query({
      query: () => '/brands', // Endpoint
    }),
  }),
});

// Export hooks สำหรับเรียกใช้ API
export const {
  useGetProductsQuery,
  useGetTrendingQuery,
  useGetBrandsQuery,
} = apiSlice;


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Product } from '../components/HomeScreen/CardProduct';

// // สร้าง API Service
// export const apiSlice = createApi({
//   reducerPath: 'api', // กำหนดชื่อ reducer
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://10.0.2.2:3000' }),
//   endpoints: (builder) => ({
  
//     getProducts: builder.query<Product[], void>({
//       query: () => '/products',
//     }),
//     getTrending: builder.query<Product[], void>({
//       query: () => '/Trending',
//     }),
//     getBrands: builder.query<Product[], void>({
//       query: () => '/brands',
//     }),
//   }),
// });

// // Export hooks สำหรับเรียกใช้ API
// export const {
//   useGetProductsQuery,
//   useGetTrendingQuery,
//   useGetBrandsQuery,
// } = apiSlice;
