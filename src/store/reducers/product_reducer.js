import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getAllProducts, getProductById } from "../actions/product_actions";


export const productSlice =  createSlice({
    name : "products",
    initialState : {
        products : [],
        product  : null,
        current_product :  null,
        message : "",
        error :   null,
        status :  ""
    },
    reducers  :  {
        all_products : (state,action) => {
            state.products.push(action.payload);
        },
        get_products :  (state,action) => {
            state.product.push(action.payload)
        },
        create_products : (state, action) =>  {
            state.product.push(action.payload)
        }
    },
    extraReducers (builder){
        builder
        .addCase(createProduct.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(createProduct.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "Succesfull created new product";
            state.product = action.payload
        })
        .addCase(createProduct.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = action.error.message;
        })
        .addCase(getAllProducts.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(getAllProducts.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "products found succesfull";
            state.products = action.payload
        })
        .addCase(getAllProducts.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = action.error.message;
        })
        .addCase(getProductById.pending,(state) => {
            state.status = "Loading"
        })
        .addCase(getProductById.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "product found succesfull";
            state.current_product = action.payload
        })
        .addCase(getProductById.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = action.error.message;
        })
    }
})

export const {all_products, get_products, create_products} = productSlice.actions;

export default productSlice.reducer;