import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productAPI = createApi({
    reducerPath:"productAPI",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000"}),
    endpoints:(builder)=>({
        getAllProducts :builder.query({
            query:()=>"/api/Product",
        }),
    }),
});

export const {useGetAllProductsQuery} = productAPI