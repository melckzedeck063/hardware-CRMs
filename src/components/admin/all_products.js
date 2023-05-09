import React, { useEffect, useState } from 'react'
import NavBar from '../containers/header'
import SideNav from '../sideBar/sideNav'
import ReactTable from './component/table_card'

import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store/actions/product_actions';
import moment from 'moment';

export default function AllProducts() {

  const [reload, setReload] =   useState(0);
  const dispatch =  useDispatch();

  const products  =  useSelector(state => state.products);

  // console.log(products.products)


  setTimeout(() => {
    if(reload < 5){
      setReload(reload  => reload + 1);
    }
  }, 1000);

  useEffect(() => {
     if(products && products.products.length < 1 && reload < 4){
      dispatch( getAllProducts());

     }
  })


    const columns = [
        {
            Header: 'ProductName',
            accessor: 'productName',
          },
        {
          Header: 'Quantity',
          accessor: 'quantity',
        },
        // {
        //   Header: 'Buying Price',
        //   accessor: 'buyingPrice',
        // },
        {
          Header: 'Whole Sale',
          accessor: 'wholeSale',
        },
        {
          Header: 'Member Price',
          accessor: 'memberPrice',
        },
        {
          Header: 'Selling Price',
          accessor: 'sellingPrice',
        },
        {
          Header: 'Added By',
          accessor: 'created_by.email',
          
        },
      
        {
          Header: 'Date Added',
          accessor: 'date_published',
          
        },
        {
          Header: 'Actions',
          accessor: 'actions',
          Cell: () => (
            <>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded mr-2">
                 <FaIcons.FaEdit className='font-2xl text-white m-1'  />
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded">
                  <MdIcons.MdDelete className='font-2xl text-white m-1'  />
              </button>
            </>
          ),
        },
      ];

      const data = [
        {
          productname: '',
          quantity: "",
          buying_price: "",
          whole_sale : "loading",
          selling_price: "",
          added_by: '',
          date_added: '',
        },
        
        // add more rows as needed
      ];

  return (
    <>
     <div className="flex w-full">
        <SideNav />
       <div className='w-full bg-white'>
          <NavBar  />
          <div className='py-2'>
            <div className="text-2xl text-sky-600 text-center font-bold">All Products</div>
            {
              products?.products?.data?(
                <>
             <div className="w-11/12 mx-auto">
                <ReactTable cols={columns} data={products.products.data} />
             </div>
                </>
              )
              :   
            <div className="w-11/12 mx-auto">
                <ReactTable cols={columns} data={data} />
            </div>
            }
          </div>
        </div>
     </div>
    </>
  )
}
