import React, { useEffect, useState } from 'react'
import NavBar from '../containers/header'
import SideNav from '../sideBar/sideNav'
import ReactTable from './component/table_card'

import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md'
import * as BiIcons from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store/actions/product_actions';
import moment from 'moment';
import { useNavigate } from 'react-router';

export default function AllProducts() {

  const [reload, setReload] =   useState(0);
  const [role, setRole] = useState(null);
  const dispatch =  useDispatch();
  const navigate =  useNavigate();

  const permission = sessionStorage.getItem('token');
   const user_role= JSON.parse(permission);
   
  //  console.log(user_role)
  setTimeout(() => {
    if(user_role !== undefined || user_role !== null){
      setRole(user_role.doc.user.role)
    }
  }, 2500);

  //  console.log(role);

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

  // const [items, setItems] =  useState([]);
  // if(products && products.products && items.length === 0){
  //   setItems(products.products.data)
  // }
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // console.log(searchQuery)
 
  // const filteredItems = items.filter((item) => {
  //   const propertiesToSearch = ['productName',"sellingPrice"]; // adjust to the properties you want to search
  //   return propertiesToSearch.some((property) =>
  //     item[property].toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // });

  // console.log(filteredItems)

  const handleEditClick = (id) => {
    console.log('Edit button clicked for ID:', id);
     navigate(`/product/${id}`)
  };

  const handleSalesClick = (id) => {
    console.log('sale button clicked for ID:', id);
     navigate(`/sale_product/${id}`);
  };

  const handleDeleteClick = (id) => {
    console.log('Delete button clicked for ID:', id);
  };

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
          Header: 'Units',
          accessor: 'unit',
        },
        {
          Header: 'Added By',
          accessor: 'created_by.firstName',
          Cell: ({row}) => (
            <>
            {
              products?.products?.data?(
              <span className='font-medium capitalize'>  {row.original.created_by.firstName} {row.original.created_by.lastName}</span>
              )
              : 
              <>
              </>
            }
            </>
          ),
          
        },
      
        {
          Header: 'Date Added',
          accessor: 'date_published',
          Cell: ({row}) => (
            <>
            {
              products?.products?.data?(
              <div> {moment(row.original.date_published).format('MMMM Do YYYY')} </div>
              )
              : 
              <>
              </>
            }
            </>
          ),
          
        },
        {
          Header: 'Actions',
          accessor: '_id',
          Cell: ({row}) => (
            <>
            {
              products?.products?.data?(
                <>
                {
                  role === 'admin'?(
                    <>
              <button onClick={() => handleEditClick(row.original._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded mr-2">
                 <FaIcons.FaEdit className='font-2xl text-white m-1'  />
              </button>
              <button onClick={() => handleSalesClick(row.original._id)} className="bg-amber-400 hover:bg-amber-500 text-white font-bold px-2 rounded mr-2">
                 <BiIcons.BiPurchaseTag className='font-2xl text-white m-1  rotate-90'  />
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded">
                  <MdIcons.MdDelete className='font-2xl text-white m-1' />
              </button>
                    </>
                  )
                  :
                  <>
              <button onClick={() => handleSalesClick(row.original._id)} className="bg-amber-400 hover:bg-amber-500 text-white font-bold px-2 rounded mr-2">
                 <BiIcons.BiPurchaseTag className='font-2xl text-white m-1  rotate-90'  />
              </button>
                  </>
                }

                </>
              )
              : 
              <>
              </>
            }
            </>
          ),
        },
      ];

      const data = [
        {
          productname: '',
          quantity: "",
          buying_price: "",
          wholeSale : "Loading",
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
                <ReactTable columns={columns} data={products.products.data} />
             </div>
                </>
              )
              :   
            <div className="w-11/12 mx-auto">
                <ReactTable columns={columns} data={data} />
            </div>
            }
          </div>
        </div>
     </div>
    </>
  )
}
