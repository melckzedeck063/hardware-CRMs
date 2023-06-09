import axios from "axios";
import {BASE_URL} from '../urls';
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.headers.post['Content-Type'] = 'application/json';

const SALES_API = axios.create({ baseURL: `${BASE_URL}/sales`});
SALES_API.interceptors.request.use((req) => {
    const storage = sessionStorage.getItem('token');
    const { token } = JSON.parse(storage);

    if (token) {
        req.headers.Authorization =  `Bearer bearer ${token}`
    }

    return req
})

const PRODUCT_API = axios.create({ baseURL: `${BASE_URL}/products`});
PRODUCT_API.interceptors.request.use((req) => {
    const storage = sessionStorage.getItem('token');
    const { token } = JSON.parse(storage);

    if (token) {
        req.headers.Authorization =  `Bearer bearer ${token}`
    }

    return req
})

export const saleNow = createAsyncThunk ( '/sale', async (values) => {
    try{
        const response = await PRODUCT_API.patch(`/update_product/${values.id}`, {
            quantity: parseInt(values.quantity - values.amount)
        })
        try{
            
    
    
            const response = await SALES_API.post('/sale_now', {
                product : values.id,
                sellingPrice :   values.selling_price,
                amount  :  values.amount,
                unit  : values.unit,
                price :  values.price
            })
    
            console.log(response.data);
            return response.data;
    
        }
        catch(error){
            console.log(error);
            return error.message
        }
    }
    catch(error){
        console.log(error)
        return error.message
    }
})

export const getAllSales =  createAsyncThunk('sales', async()  =>  {
    try{
        const response =   await SALES_API.get('/all_sales');
        
        console.log(response.data);
        return response.data
    }
    catch(error){
        console.log(error);
        return error.message
    }
})

export const getReport =  createAsyncThunk('/report', async(values) => {
    try{
        const response =  await SALES_API.get(`/monthly?start=${values.start_date}&end=${values.end_date}`);

        // console.log(response.data);
        return response.data
    }
    catch(error){
        console.log(error)
        return error.message
    }
})