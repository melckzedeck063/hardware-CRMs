import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import SideNav from '../sideBar/sideNav';
import NavBar from '../containers/header';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md' 
import image from '../../assets/images/clinton.png'

import ReactTable from './component/table_card';
import { useNavigate } from 'react-router';

export default function  CartPage() {

    const [hide,setHide] =  useState(true);
    const  navigate  = useNavigate();

    const {
        isEmpty,
        cartTotal,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        emptyCart
      } = useCart();

    //   console.log(items)

    const printInvoice = () => {
        setHide(false);
        setTimeout(() => {
            window.print();
        }, 2000);

        setTimeout(() => {
           emptyCart()
        }, 60000);
      }

    const columns = [
        {
            Header: 'ProductName',
            accessor: 'productName',
          },
          
        {
          Header: 'Selling Price',
          accessor: 'selling_price',
        },
        {
            Header: 'Units',
            accessor: 'unit',
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
            {
                hide && (
                    <SideNav />
                )
            }
            <div className="w-full">
                {
                    hide && (
                        <NavBar />
                        )
                    }
                <div className='py-2'>
            <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image} alt="" className='h-32 w-52 mx-auto' />
            </div>
            <div className="flex justify-between  w-10/12 mx-auto">
                <div className="-ml-8">
                    <div className="text-sky-600 font-medium">Clinton Electrical Solution</div>
                    <div className="text-sky-600 font-medium">Dodoma</div>
                    <div className="text-sky-600 font-medium">6th Road Kidia One</div>
                    <div className="text-sky-600 font-medium"> {totalUniqueItems} Item(s)</div>
                </div>
                <div className="">
                <div className="text-sky-600 font-mediumm">clinton@solution.co.tz</div>
                    <div className="text-sky-600 font-medium">0744327867</div>
                    <div className="text-sky-600 font-medium">{totalUniqueItems} Item(s) </div>
                    <div className="text-lg font-bold text-sky-600 flex justify-between">
                        <div className="text-green-700 font-normal">Total </div>
                        <div className="text-sky-600">{cartTotal} Tshs</div>
                    </div>
                </div>
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
                <div className="py-2 flex space-x-6">
                    {
                        hide &&(
                          <div className="flex space-x-6 w-10/12 mx-auto">
                          <button onClick={() => navigate('/products')} className='bg-green-700 rounded-lg py-1 px-2 text-white font-medium'>Add Item</button>
                            <button onClick={() => printInvoice()} className='bg-sky-500 rounded-lg py-1 px-2 text-white font-medium'>Generate  Perfoma</button>
                         </div>
                        )
                    }
                </div>
          </div>
            </div>
        </div>
    </div>
  )
}
