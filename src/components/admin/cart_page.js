import React from 'react';
import { useCart } from 'react-use-cart';
import SideNav from '../sideBar/sideNav';
import NavBar from '../containers/header';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md' 

import ReactTable from './component/table_card';

export default function  CartPage() {

    const {
        isEmpty,
        cartTotal,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
      } = useCart();

      console.log(items)

    const columns = [
        {
            Header: 'ProductName',
            accessor: 'productName',
          },
          {
            Header: 'Buying Price',
            accessor: 'buyingPrice',
          },
        {
          Header: 'Selling Price',
          accessor: 'selling_price',
        },
        {
          Header: 'Amount',
          accessor: 'amount',
        },
        {
            Header: 'Total Cost',
            accessor: 'price',
          },
        {
          Header: 'Sold By',
          accessor: 'loading',
        },
        // {
        //   Header: 'Actions',
        //   accessor: 'actions',
        //   Cell: () => (
        //     <>
        //       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded mr-2">
        //          <FaIcons.FaEdit className='font-2xl text-white m-1' />
        //       </button>
        //       <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded">
        //           <MdIcons.MdDelete className='font-2xl text-white m-1'  />
        //       </button>
        //     </>
        //   ),
        // },
      ];

      const data = [
        {
          firstname: '',
          lastname: '',
          age: 30,
          email: 'Loading',
          phone: '',
          postion: '',
          city: '',
          country: '',
        },
        
      ];

  return (
    <div className='w-full bg-white'>
        <div className="flex w-full">
            <SideNav />
            <div className="w-full">
                <NavBar />
                <div className='py-2'>
            <div className="text-2xl text-sky-600 text-center font-bold">Sold Items</div>
                <div className="py-2 flex space-x-32 w-10/12 mx-auto -mr-96">
                    <div className="">
                     {totalUniqueItems} item(s) 
                    </div> 
                    <div className="text-lg font-bold text-sky-500"> {cartTotal} Tshs </div>
                </div>
            {
              items?(
              <div className="w-11/12 mx-auto">
                <ReactTable cols={columns} data={items} />
            </div>
              )
              : 
              <>
            <div className="w-11/12 mx-auto">
                <ReactTable cols={columns} data={data} />
            </div>
            </>
            }
          </div>
            </div>
        </div>
    </div>
  )
}
