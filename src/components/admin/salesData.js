import React, { useEffect, useState } from 'react'
import SideNav from '../sideBar/sideNav'
import NavBar from '../containers/header'
import moment from 'moment'
import ReactTable from './component/table_card'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSales } from '../../store/actions/sales_actions'

export default function SalesData() {

  const [reload,setReload] =  useState(0);
  const dispatch =  useDispatch();

  setTimeout(() => {
    if(reload < 5){
      setReload(reload => reload + 1);
    }
  }, 700);

  const sales = useSelector(state => state.sales);
  // console.log(sales.all_sales)

  useEffect(()  => {
    if(sales && sales.all_sales.length < 1 && reload < 3){
      dispatch( getAllSales() )
    }
  })

  const columns = [
    {
        Header: 'ProductName',
        accessor: 'productName',
        Cell: ({row}) => (
          <>
          {
            sales?.all_sales?.data?(
            <span className='font-medium capitalize'>  {row.original.product.productName} </span>
            )
            : 
            <>
            </>
          }
          </>
        ),
      },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    // {
    //   Header: 'Buying Price',
    //   accessor: 'buyingPrice',
    // },
    {
      Header: 'Whole Sale',
      accessor: 'wholeSale',
      Cell: ({row}) => (
        <>
        {
          sales?.all_sales?.data?(
          <span className='font-medium capitalize'>  {row.original.product.wholeSale} </span>
          )
          : 
          <>
          </>
        }
        </>
      ),
    },
    {
      Header: 'Member Price',
      accessor: 'memberPrice',
      Cell: ({row}) => (
        <>
        {
          sales?.all_sales?.data?(
          <span className='font-medium capitalize'>  {row.original.product.memberPrice} </span>
          )
          : 
          <>
          </>
        }
        </>
      ),
    },
    {
      Header: 'Selling Price',
      accessor: 'sellingPrice',
    },
    {
      Header: 'Units',
      accessor: 'Unit',
    },
    {
      Header: 'Sold By',
      accessor: 'created_by.firstName',
      Cell: ({row}) => (
        <>
        {
          sales?.all_sales?.data?(
          <span className='font-medium capitalize'>  {row.original.sold_by.firstName} {row.original.sold_by.lastName}</span>
          )
          : 
          <>
          </>
        }
        </>
      ),
      
    },
  
    {
      Header: 'Date Sold',
      accessor: 'date_published',
      Cell: ({row}) => (
        <>
        {
          data?(
          <div> {moment(row.original.date_sold).format('MMMM Do YYYY')} </div>
          )
          : 
          <>
          </>
        }
        </>
      ),
}
]

const data = [
  {
    productname: '',
    quantity: "",
    buying_price: "",
    wholeSale : "Loading",
    selling_price: "",
    sold_by: '',
    date_sold: '',
  },
  // add more rows as needed
];

  return (
    <div className='flex w-full justify-between'>
            <SideNav />
          <div className='w-full'>
              <NavBar />
              <div className="bg-slate-50 py-10">
                  <div className="mx-auto w-11/12 lg:w-10/12 xl:w-10/12">
                      <div className="rounded-md shadow bg-white w-full">
                        <div className="font-bold text-sky-600 text-lg text-right">Sales Record</div>
                        {
                          sales?.all_sales?.data?.all_sales?(
                            <ReactTable columns={columns} data={sales.all_sales.data.all_sales}/>
                          )
                          : 
                          <>
                          <ReactTable columns={columns} data={data}/>
                          </>
                        }
                        </div>
                  </div>
              </div>
        </div>
    </div>              
  )
}
