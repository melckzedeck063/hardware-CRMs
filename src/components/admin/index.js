import React from 'react'
import { useState,useEffect } from 'react';
// import { getAllOrders, getMyOrders } from '../../store/actions/order_actions';
// import * as BsIcons from 'react-icons/bs';
// import * as HiIcons from 'react-icons/hi'
import * as FaIcons from 'react-icons/fa'
import image from '../../assets/images/clinton.png'

// import { useDispatch, useSelector } from 'react-redux';
// import SideNav from '../sideBar/sideNav';

import DashCard  from './component/dashboard_cards';
import NewCard from './component/new_cards'

import DataChart from './charts/data_chart';
import PieChart from './charts/new_chart';
// import { dashboardSummary } from '../../store/actions/dashboard_actions';
import NavBar from '../containers/header';
import SideNav from '../sideBar/sideNav'
import { getDashboardSummary } from '../../store/actions/user_actions';
import { useDispatch,useSelector } from 'react-redux';

function Dashboard() {
   
  const [userRole, setUserRole] = useState("");
  const [renders, setRenders] = useState(0);
  const dispatch = useDispatch();

  setTimeout(() => {
    if (renders < 5) {
        setRenders( renders + 1 )
    }
}, 600);

const dash_summary  = useSelector(state => state.users)
console.log(dash_summary.dashboard)

useEffect(() => {
  if (dash_summary && dash_summary.dashboard === null && renders < 3 ) {
      dispatch( getDashboardSummary() )
  }
})

//   if (userRole === "") {
//     const storage = sessionStorage.getItem('authenticatedUser');
//     const { roles } = JSON.parse(storage);
//     // console.log(roles)
//     if (roles.includes("ADMIN" && "SELLER")) {
//       setUserRole("ADMIN")
//       return setUserRole("ADMIN")
//     }
//     else if (roles.includes("SELLER" && !"ADMIN")) {
//        return setUserRole("SELLER")
//     }

//   }

  


  return (
      <>
          <div>
              <div className="flex w-full"> 
          <SideNav />
          
          
          <div  className="w-full bg-slatee-50">
            {/* <AdminHeader /> */}
            <NavBar  />
            
            <div className="w-full p-4 xl:p-5 lg:p-6 md:p-5 mx-auto py-12">
              <div className="grid grid-cols-2 w-10/12 mx-auto">
                <div className="text-green-700 font-bold mt-10 text-3xl">Hello! Welcome to </div>
                <div className="">
                  <img src={image} className='h-40 w-full -mt-4' alt="" />
                </div>
              </div>
            <div className="mx-auto">
                {
                  dash_summary?.dashboard ? (
                  dash_summary?.dashboard && dash_summary.dashboard.empty === false ? (
              <div className="grid xsm:grid-cols-1 gap-6 sm:grid-cols-1 grid-cols-2  w-11/12 mx-auto mb-4">
                  <DashCard heading={"AVAILABLE PRODUCTS"} data={dash_summary.dashboard.data.product_data[0].total_products} />
                  <DashCard heading={"SOLD PRODUCTS"} data={0} />
                  <DashCard heading={"AVAILABLE PRODUCTS"} data={0}/>
                  <DashCard heading={"ALL CATEGORIES"} data={0}  />
                </div>
                     
                    ) : <>
                    <div className="grid xsm:grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2  grid-cols-2 w-11/12 mx-auto mb-4">
                  <DashCard heading={"ALL PRODUCTS"} data={0} />
                  <DashCard heading={"SOLD PRODUCTS"} data={0} />
                  <DashCard heading={"AVAILABLE PRODUCTS"} data={0}/>
                  <DashCard heading={"ALL CATEGORIES"} data={0}  />
                </div>
                      </>
                   ) :  null
                } 
                
             
                     
                      {/* {
                        dash_summary && dash_summary.dashboard ? (
                       dash_summary && dash_summary.dashboard && dash_summary.dashboard.empty === false ? (
                          <>
                  <div className=" mt-2 w-11/12 mx-auto">
                    {/* <div className="mb-3">
                      <PieChart content={dash_summary && dash_summary.dashboard? dash_summary.dashboard.data.graphData.pieChartData : ""} />
                    </div> */}
                    
                    {/* <div className="grid grid-cols-1 gap-2 w-full mx-auto">
                    <NewCard data={dash_summary.dashboard.data.total_sales[0].sales} heading={"TOTAL SALES"} />
                    <NewCard data={64} heading={"TOTAL PROFIT"} />
                  </div>
                  
                  </div> */}
                  {/* <div className="py-6 bg-white shadow-xl rounded px-1 text-white w-11/12 mx-auto my-6">
                    <DataChart  content={dash_summary && dash_summary.dashboard_data? dash_summary.dashboard_data.data.graphData.lineChartData : ""} />
                  </div> */}
                  
                  

               </div>
              </div>
                  {/* <button onClick={() => dispatch( getDashboardSummary() )} > click</button> */}
                  </div>
            </div>
          </div> 
      </>
  )
}

export default Dashboard
