import { createSlice } from "@reduxjs/toolkit";
import { getAllSales, getReport, saleNow } from "../actions/sales_actions";


const salesReducer =   createSlice({
    name : "sales",
    initialState  : {
        all_sales:  [],
        sale :  null,
        reports : [],
        new_sale :  null,
        status : "",
        error :  null
    },
    reducers :  {
        new_sales : (state,action) => {
            state.new_sale.push(action.payload)
        },
        all_sales : (state,action) => {
            state.all_sales.push(action.payload)
        },
        current_sale : (state,action) => {
            state.sale.push(action.payload)
        }
    },
    extraReducers(builder){
     builder
     .addCase(saleNow.pending, (state,action) => {
        state.status = "Loading"
     })
     .addCase(saleNow.fulfilled, (state,action) => {
        state.status = "Succesfull";
        state.sale =  action.payload
     })
     .addCase(saleNow.rejected, (state,action) => {
        state.status = "Failed";
        state.error =  action.error.message
     })
     .addCase(getAllSales.pending, (state,action) => {
        state.status = "Loading"
     })
     .addCase(getAllSales.fulfilled, (state,action) => {
        state.status = "Succesfull";
        state.all_sales =  action.payload
     })
     .addCase(getAllSales.rejected, (state,action) => {
        state.status = "Failed";
        state.error =  action.error.message
     })
     .addCase(getReport.pending, (state,action) => {
        state.status = "Loading"
     })
     .addCase(getReport.fulfilled, (state,action) => {
        state.status = "Succesfull";
        state.reports =  action.payload
     })
     .addCase(getReport.rejected, (state,action) => {
        state.status = "Failed";
        state.error =  action.error.message
     })
    }
})

export const  {new_sale,all_sales,current_sale} = salesReducer.actions;
export default  salesReducer.reducer