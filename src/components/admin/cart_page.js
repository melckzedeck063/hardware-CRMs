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
    const [price,setPrice] =  useState("");
    const [customerName, setCustomerName] =  useState("")
    const date = new Date();

    const {
        isEmpty,
        cartTotal,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        emptyCart
      } = useCart();

      console.log(items)

    const printInvoice = () => {
        setHide(false);
        setTimeout(() => {
            window.print();
        }, 2000);

        setTimeout(() => {
           emptyCart()
        }, 60000);
      }

    

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
            {/* <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image} alt="" className='h-32 w-52 mx-auto' />
            </div> */}
            <div className="flex justify-between  w-10/12 mx-auto">
                <div className="-ml-8">
                <img src={image} alt="" className='h-48 w-64 mx-auto -mt-1' />
                </div>
                <div className="mt-14">
                  <div className="flex space-x-4">
                    <div className="text-sky-600 font-bold">Email :</div> 
                    <div className="text-sky-600 font-mediumm">clinton@solution.co.tz</div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="text-sky-600 font-bold">Phone :</div>
                    <div className="text-sky-600 font-medium">0744327867</div>
                  </div>
                    <div className="flex space-x-4">
                    <div className="text-sky-600 font-bold">Date :</div>                     
                    <div className="text-sky-600 font-medium"> {date.getDate() }-{date.getMonth()}-{ date.getFullYear() } </div>
                    </div>
                    <div className="text-lg  text-sky-600 flex space-x-4">
                        <div className="text-green-700 font-bold">Bill To :</div>
                        <div className="text-sky-600 text-lg capitalize font-light"> {customerName} </div>
                    </div>

                    {
                      hide &&(                     
                    <div className="">
                          <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                              <label htmlFor="Lastname" className='text-sky-600'>Select Customer</label> <br />
                              <select name="" id=""
                                     className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 "border-sky-500 `}
                                     onChange = {(e) => setCustomerName(e.target.value) }
                              >
                                <option value="">Select Sale Options</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Cotton2">Cotton</option>
                                <option value="Cotton1">Cotton</option>
                              </select>
                          </div>
                          </div>
                      )
                    }
                </div>
                
            </div>
                
            <div className="rounded-lg w-11/12 mx-auto shadow-lg my-3">
              <table className='w-full
              '>
                <thead className='bg-sky-600 w-full'>
                  <th className="py-1 px-2 font-medium text-white text-left">S/NO</th>
                  <th className="py-1 px-2 font-medium text-white text-left">Product Name</th>
                  <th className="py-1 px-2 font-medium text-white text-left">Quantity</th>
                  <th className="py-1 px-2 font-medium text-white text-left">Units</th>
                  <th className="py-1 px-2 font-medium text-white text-left">Price</th>
                  <th className="py-1 px-2 font-medium text-white text-left">Total</th>
                  {/* <th className="py-1 px-2 font-medium text-white text-left">Action</th> */}
                </thead>
                <tbody>
                  {
                    items? items.map((item,index) =>(
                      <tr  className="border-b border-slate-200 my-1">
                    <td className="px-2 py-1 text-slate-700 text-smm font-light"> {index + 1} </td>
                    <td className="px-2 py-1 text-slate-700 text-smm font-light">{item.productName}</td>
                    <td className="px-2 py-1 text-slate-700 text-smm font-light"> {item.amount} </td>
                    <td className="px-2 py-1 text-slate-700 text-smm font-light"> {item.unit} </td>
                    <td onClick={() => (console.log('clicked'))} className="px-2 py-1 text-slate-700 text-smm font-light"> {item.selling_price} </td>
                    <td className="px-2 py-1 text-slate-700 text-smm font-light"> {item.price} </td>
                    {/* <td className="px-2 py-1 text-slate-700 text-smm font-light"></td> */}
                  </tr>
                    ))
                     : 
                     <>
                       <tr className="border-b border-slate-200 my-1.5 py-1">
                    <td className="px-2 py-1 text-slate-700 text-smm font-light"></td>
                    <td className="px-2 py-1 text-slate-700 text-smm font-light"></td>
                    <td className="px-2 py-1 text-slate-700 text-smm font-light animate-pulse">Loading</td>
                    <td className="px-2 py-1 text-slate-700 text-smm font-light"></td>
                    <td className="px-2 py-1 text-slate-700 text-smm font-light"></td>
                    {/* <td className="px-2 py-1 text-slate-700 text-smm font-light"></td> */}
                  </tr>
                     </>
                  }
                  
                </tbody>
              </table>
              <div className="py-2 mt-8">
                <div className="flex space-x-8">

                  <div className="w-7/12 border border-slate-400 rounded-md ml-2 px-2">
                    <div className="text-lg font-medium">
                      Conditions : 
                    </div>
                    <div className="text-slate-700 text-sm">
                      All goods remain the property of <span className="text-sky-600 font-medium">Clinton Electrical Solution.</span>
                      Until payment has been received in full
                    </div>
                  </div>

                  <div className="">
                    <div className="border border-slate-400 px-6 rounded-md">
                      <div className="flex justify-between space-x-6 my-1">
                      <div className="text-lg font-bold text-sky-600">SUBTOTAL  </div>
                      <div className="text-lg font-medium"> TZS {cartTotal} </div>
                      </div>
                      <div className="flex justify-between space-x-6 my-1">
                      <div className="text-lg font-bold text-sky-600">VAT (0.0%) </div>
                      <div className="text-lg font-medium"> TZS 0.00 </div>
                      </div>
                      <div className="flex justify-between space-x-6 my-1">
                      <div className="text-lg font-bold text-sky-600">PAYABLE </div>
                      <div className="text-lg font-medium"> TZS {cartTotal} </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="flexx justifyx-between w-10/12 grid mx-auto grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 xsm:grid-cols-2">
                <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image} alt="" className='h-32 w-36 mx-auto' />
                </div>

                <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image} alt="" className='h-32 w-36 mx-auto' />
            </div>

            <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image} alt="" className='h-32 w-36 mx-auto' />
            </div>

            <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image} alt="" className='h-32 w-36 mx-auto' />
            </div>
            <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image} alt="" className='h-32 w-36 mx-auto' />
            </div>
                </div>
              </div>
            </div>
                <div className="flex space-x-6">
                  <div></div>
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
