import React, {useState, useEffect} from 'react'
import NavBar from '../containers/header'
import SideNav from '../sideBar/sideNav'
import ReactTable from './component/table_card'

import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStaffs, getAllCustomers } from '../../store/actions/user_actions';
import { useNavigate } from 'react-router';

export default function AllStaffs() {

  const [renders, setRenders] =  useState(0);
  const dispatch = useDispatch();
  const navigate =  useNavigate()



  const customers  =  useSelector(state  => state.users);
  // console.log(customers.users);

  setTimeout(() => {
    if(renders  < 5){
      setRenders(renders => renders + 1);
    }
  }, 1000);

  useEffect(() =>{
    if(customers && customers.users &&  customers.users.length < 1 &&  renders <= 3){
       dispatch( getAllCustomers() )
    }
  })

  const handleEditClick = (id) => {
    console.log('Edit button clicked for ID:', id);
     navigate(`/staff/${id}`)
  };

  const handleDeleteClick = (id) => {
    console.log('Delete button clicked for ID:', id);
  };


    const columns = [
        {
          Header: 'FirstName',
          accessor: 'firstName',
        },
        {
            Header: 'LastName',
            accessor: 'lastName',
          },
        
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'Phone',
          accessor: 'telephone',
        },       
        
        {
          Header: 'Position',
          accessor: 'role',
        },
        {
          Header: 'Actions',
          accessor: 'actions',
          Cell: ({row}) => (
            <>
              <button onClick={() => handleEditClick(row.original._id) } className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded mr-2">
                 <FaIcons.FaEdit className='font-2xl text-white m-1'  />
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded">
                  <MdIcons.MdDelete className='font-2xl text-white m-1'  />
              </button>
            </>
          ),
        },
      ];

// let  data = [];
//       if(customers.users && customers.users.data.data){
//         data.push(customers.users.data.data)
//       } 
//       else {
    const data = [
          {
            firstname: '',
            lastname : '',
            email: 'loading',
            phone: '',
            country: '',
          },
    ]
      // }
        // add more rows as needed
      

  return (
    <>
     <div className="flex w-full">
        <SideNav />
       <div className='w-full bg-white'>
          <NavBar  />
          <div className='py-2'>
            <div className="flex justify-between w-11/12 mx-auto">             
                <div className="text-2xl text-sky-600 text-center font-bold">Our Staffs</div>
                <button onClick={() => navigate('/register')} className="px-2 py-1 bg-green-600 text-white text-sm rounded-lg font-medium"> Add User </button>
            </div>
            {
              customers.users?.data?.data?(
              <div className="w-11/12 mx-auto">
                <ReactTable columns={columns} data={customers.users.data.data} />
            </div>
              )
              : 
              <>
              <div className="w-11/12 mx-auto">
                <ReactTable columns={columns} data={data} />
            </div>
            </>
            }
          </div>
        </div>
     </div>
    </>
  )
}