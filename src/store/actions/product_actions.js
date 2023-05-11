
import axios from "axios";
import {BASE_URL} from '../urls';
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const PRODUCT_API = axios.create({ baseURL: `${BASE_URL}/products`});
PRODUCT_API.interceptors.request.use((req) => {
    const storage = sessionStorage.getItem('token');
    const { token } = JSON.parse(storage);

    if (token) {
        req.headers.Authorization =  `Bearer bearer ${token}`
    }

    return req
})


export const createProduct =  createAsyncThunk('/new_product', async(values)  => {
      try{
        const response =  await PRODUCT_API.post('/new_product', {
            productName :  values.productName,
            buyingPrice :   values.buyingPrice,
            wholeSale :  values.wholeSale,
            sellingPrice  :  values.sellingPrice,
            memberPrice :  values.memberPrice,
            quantity :  values.quantity
        });

        // console.log(response.data);
        return response.data;

      }
      catch(error){
        console.log(error);
        return error.message
      }
})


export const getAllProducts  =  createAsyncThunk('/all_products', async() =>  {
    try{
        const response  = await PRODUCT_API.get('/all_products');

        // console.log(response.data);
        return   response.data
    }
    catch(error) {
        console.log(error.message)
        return  error.message
    }
})

export const getProductById =   createAsyncThunk('/product', async(id) => {
    try{
        const response = await  PRODUCT_API.get(`/product/${id}`);

        // console.log(response.data);
        return response.data
    }
    catch(error){
        console.log(error);
        return error.message;
    }
})

export const updateProduct =  createAsyncThunk('/update', async (values,id)  => {
    // console.log(id)
    try{
        const  response = await PRODUCT_API.patch(`/update_product/${values.id}`, {
            productName :  values.productName,
            buyingPrice :   values.buyingPrice,
            wholeSale :  values.wholeSale,
            sellingPrice  :  values.sellingPrice,
            memberPrice :  values.memberPrice,
            quantity :  values.quantity
        });

        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.log(error);
        return error.message;
    }
})