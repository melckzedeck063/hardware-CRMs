import React from 'react'
import NavBar from '../containers/header'
import SideNav from '../sideBar/sideNav'
import ReactTable from './component/table_card'

import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md'

export default function AllProducts() {

    const columns = [
        {
            Header: 'ProductName',
            accessor: 'productname',
          },
        {
          Header: 'Quantity',
          accessor: 'quantity',
        },
        {
          Header: 'Buying Price',
          accessor: 'buying_price',
        },
        {
          Header: 'Whole Sale',
          accessor: 'whole_sale',
        },
        {
          Header: 'Selling Price',
          accessor: 'selling_price',
        },
        {
          Header: 'Added By',
          accessor: 'added_by',
        },
        {
          Header: 'Date Added',
          accessor: 'date_added',
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
          productname: 'Tronic Socket 2 in 1',
          quantity: 30,
          buying_price: 9000,
          whole_sale : 9500,
          selling_price: 10000,
          added_by: 'Clinton Solution',
          date_added: '2023-05-10',
        },
        {
          productname: 'Junction 4 way',
          quantity: 20,
          buying_price: 3000,
          whole_sale : 3500,
          selling_price: 3700,
          added_by: 'Clinton Solution',
          date_added: '2023-05-12',
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
            <div className="text-2xl text-sky-600 text-center font-bold">All Requests</div>
            <div className="w-11/12 mx-auto">
                <ReactTable cols={columns} data={data} />
            </div>
          </div>
        </div>
     </div>
    </>
  )
}
