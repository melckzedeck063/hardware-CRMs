import React, { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import SideNav from '../sideBar/sideNav';
import NavBar from '../containers/header';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md' 
import image from '../../assets/images/clinton.png'

import image1 from '../../assets/images/olivia.png'
import image4 from '../../assets/images/panasonic.png'
import image5 from '../../assets/images/2109012.png'
import image2 from '../../assets/images/africab-side.png'
import image3 from '../../assets/images/tronic.png'

import ReactTable from './component/table_card';
import { useNavigate } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import { getCustomerById, getOurCustomers } from '../../store/actions/user_actions';

export default function  CartPage() {

    const [hide,setHide] =  useState(true);
    const  navigate  = useNavigate();
    const [price,setPrice] =  useState("");
    const [customerName, setCustomerName] =  useState(null)
    
    const date = new Date();

    // console.log(customerName)

    const dispatch =  useDispatch();
    const [reload, setReload] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [itemId,setItemId] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  
  const handleOpenModal = (id) => {
    setShowModal(true);
    // console.log(id)
    setItemId( getItem(id))
    // getItem(id);
  };

  // console.log(itemId);

  const handleCloseModal = () => {
    setShowModal(false);
  };


    const  customers = useSelector(state =>  state.users)
    // console.log(customers.customers)
  

    setTimeout(() => {
        if(reload < 5){
            setReload(reload  =>  reload + 1)
        }
    }, 1000);

    useEffect(() => {
        if(customers &&  customers.customers.length < 1 && reload <4){
            dispatch( getOurCustomers());
        }
    })



    const {
        isEmpty,
        cartTotal,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        emptyCart,
        updateItem,
        getItem
      } = useCart();

      // console.log(items)

      

      const handleSubmit = (e) => {
        e.preventDefault();
        // Process the form data
        // console.log(inputValue, itemId);
    
        updateItem(itemId.id, {
          selling_price : inputValue,
          price : (Number(inputValue) * Number(itemId.amount) ),
          cartTotal : (Number(inputValue) * Number(itemId.amount) )
        })
        // Close the modal or perform any other action
        setShowModal(false);
      };
    

    const printInvoice = () => {
        setHide(false);
        setTimeout(() => {
            window.print();
        }, 2000);

        setTimeout(() => {
           emptyCart()
        }, 10000);
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
            <div className="flex justify-between xl:w-10/12  w-11/12 mx-auto">
                <div className="-ml-8">
                <img src={image} alt="" className='h-48 w-64 -ml-7 mx-auto -mt-1' />

                <div className="my-1.5 -mt-8">
                      <div className="text-slate-700">P.O.BOX 1997 Dodoma</div>
                      <div className="text-slate-700">TIN : <span className="text-sky-600">133-457-615</span></div>
                      <div className="text-slate-700">LOCATION : <span className="text-sky-600">Dodoma 9<sup>th</sup> Road opposite Kidia Hotel </span></div>
                    </div>
                </div>

                <div className="">
                  <div className="text-slate-500 xl:text-2xl lg:text-xl text-lg font-medium mt-20 -ml-4 ">
                    TAX INVOICE 
                  </div>
                </div>
                <div className="mt-14">
                  <div className="flex space-x-4">
                    <div className="text-sky-600 font-bold">Email :</div> 
                    <div className="text-sky-600 font-mediumm">clintonelectricalsolution@gmail.com</div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="text-sky-600 font-bold">Phone :</div>
                    <div className="text-sky-600 font-medium">0788019895 / 0755905957</div>
                  </div>
                    <div className="flex space-x-4">
                    <div className="text-sky-600 font-bold">Date :</div>                     
                    <div className="text-sky-600 font-medium"> {date.getDate() }-{date.getMonth() + 1}-{ date.getFullYear() } </div>
                    </div>
                    <div className="text-lg  text-sky-600 flex space-x-4">
                        <div className="text-green-700 font-bold">Bill To :</div>
                        {
                          customerName &&(
                            <div className="text-sky-600 text-lg capitalize font-light"> {customerName} </div>
                            )
                          }
                    </div>
                    <div className="text-lg  text-sky-600 flex space-x-4">
                        <div className="text-green-700 font-bold">Perfoma No : </div>
                        <div className="text-sky-600 text-lg capitalize font-light"> { `${date.getDate()}-${date.getMonth()+1}-${date.getHours() }${date.getMinutes()}` } </div>
                    </div>

                    {
                      customers?.customers?.data?.data &&
                     hide &&(                     
                    <div className="">
                          <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                              <label htmlFor="Lastname" className='text-sky-600'>Select Customer</label> <br />
                              <select name="" id=""
                                     className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 "border-sky-500 `}
                                     onChange = {(e) => setCustomerName(e.target.value) }
                              >
                                <option value="">Select Sale Options</option>
                                {
                                  customers?.customers?.data?.data.map((item) =>(
                                    <option key={item._id} value={`${item.firstName} ${item.lastName}`}>{item.firstName} {item.lastName} </option>
                                  ))
                                }
                                
                              </select>
                          </div>
                          </div>
                      )
                    }
                </div>
                
            </div>
                
            <div className="rounded-lg w-11/12 mx-auto shadow-lg my-3">
            {showModal && 
            
            <>
             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg p-6 w-4/12">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Selling Price</label> <br />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange} 
            className="border border-gray-300 rounded-md p-2 mb-4 w-full mx-auto"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
            </>
            }


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
                      <tr key={item.id}  className="border-b border-slate-200 my-1">
                    <td className="px-2 py-1 text-slate-800 text-smm font-light"> {index + 1} </td>
                    <td className="px-2 py-1 text-slate-800 text-smm font-light">{item.productName}</td>
                    <td className="px-2 py-1 text-slate-800 text-smm font-light"> {item.amount} </td>
                    <td className="px-2 py-1 text-slate-800 text-smm font-light"> {item.unit} </td>
                    <td onClick={(e) => handleOpenModal(item.id)} className="px-2 py-1 text-slate-700 text-smm font-light"> {item.selling_price} </td>
                    <td className="px-2 py-1 text-slate-700 text-smm font-light">{ Number(item.selling_price) * Number(item.amount) } </td>
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
                <div className="w-11/12 grid mx-auto grid-cols-5 my-2">
                <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image1} alt="" className='h-38 w-11/12 mx-auto' />
                </div>

                <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image2} alt="" className='h-38 mt-6 w-11/12 mx-auto' />
            </div>

            <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image5} alt="" className='h-20 mt-2 w-11/12 mx-auto' />
            </div>
            <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image3} alt="" className='h-32 w-11/12 mx-auto' />
            </div>

            <div className="text-2xl text-sky-600 text-center font-bold">
               <img src={image4} alt="" className='h-32  w-11/12 mx-auto' />
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


// function Modal() {
//   const [inputValue, setInputValue] = useState('');

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Process the form data
//     console.log(inputValue);
//     // Close the modal or perform any other action
//     setShowModal(false);
//   };

//   const handleCancel = () => {
//     // Close the modal or perform any other action
//     setShowModal(false);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg p-6">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={inputValue}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 mb-4"
//           />
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
//             >
//               Submit
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

