import React, { useRef, useState } from 'react'

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
// import { generateReport } from '../../store/actions/sales_actions';
import moment from 'moment';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useNavigate } from 'react-router';
import SideNav from '../sideBar/sideNav';
import NavBar from '../containers/header';
import ReactTable from './component/table_card';
import { getReport } from '../../store/actions/sales_actions';

const schema = Yup.object({
    start_date: Yup
        .string()
        .required()
        .trim(),
    end_date: Yup
        .string()
        .required()
        .trim()
}).required()

function Reports() {

    const dispatch = useDispatch();
    const tableRef = useRef(null)


    const [userRole, setUserRole] = useState(null);
    const navigate =  useNavigate()
  
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

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: "all",
        reValidateMode: "onChange",
        shouldFocusError: true,
        resolver : yupResolver(schema)
    })

    const onSubmit = data => {
        dispatch( getReport(data) )
        // console.log(data)
    }

    const report = useSelector(state => state.sales);
    // console.log(report.reports);

  return (
      <>
       <div className="flex">
              <SideNav />
              <div className="w-full mx-auto bg-slate-200">
                  <NavBar />
                  <div className="py-6 w-11/12 mx-auto">
                  <div className="bg-white shadow rounded-md">
                      <p className="text-2xl font-bold text-sky-500 mb-1 px-4 py-1">Recorded Sales</p>
                      <div className="p-2">
                        <form onSubmit={ handleSubmit(onSubmit) } className='p-2'>
                             <div className="flex space-x-6">
                             <div className="">
                                <label htmlFor="Start Date">Start Date</label> <br />
                                <input type="date"  className="rounded border-2 border-slate-400 bg-white"
                                 defaultValue={ ""}
                                 {...register("start_date")}
                                />
                                <span className="text-red-500 text-sm"> {errors.start_date?.message} </span>
                             </div> 
                             <div className="">
                                <label htmlFor="End Date">End Date</label> <br />
                                <input type="date"  className="rounded border-2 border-slate-400 bg-white"
                                defaultValue={""}
                                {...register("end_date")}
                                />
                                <span className="text-red-500 text-sm"> {errors.end_date?.message} </span>
                             </div> 
                             <div className="">
                                <br />
                                <button disabled={!isDirty || !isValid} className='rounded bg-sky-600 text-white px-4 py-1'>Generate</button>
                             </div>
                            </div>                           
                        </form>
                      </div>
                           <div className="flex flex-col">
                              <div className="mx-1 overflow-x-auto">
                                  <div className="px-2 inline-block min-w-full">
                                      <div className="overflow-hidden">
                <DownloadTableExcel
                    filename="Sales Table"
                    sheet="Sales"
                    currentTableRef={tableRef.current}
                >

                   <button className='py-1 px-4 font-medium mx-2 rounded my-1 text-white bg-green_deep'> Export excel </button>

                </DownloadTableExcel>
                <table ref={tableRef} className="min-w-full table-auto mb-4">
                                              <thead className="border-b bg-sky-600 w-full">
                                                  <tr>
                                                      <th className="xsm:text-sm sm:text-sm font-medium text-gray-100 px-4 py-2 text-left">S/NO</th>
                                                      <th className="xsm:text-sm sm:text-sm font-medium text-gray-100 px-4 py-2 text-left">Name</th>
                                                      {/* <th className="xsm:text-sm sm:text-sm font-medium text-gray-100 px-4 py-2 text-left">Brand</th> */}
                                                      <th className="xsm:text-sm sm:text-sm font-medium text-gray-100 px-4 py-2 text-left">Quantity Sold</th>
                                                      <th className="xsm:text-sm sm:text-sm font-medium text-gray-100 px-4 py-2 text-left">Selling Price</th>
                                                      <th className="xsm:text-sm sm:text-sm font-medium text-gray-100 px-4 py-2 text-left"> Total </th>
                                                      <th className="xsm:text-sm sm:text-sm font-medium text-gray-100 px-4 py-2 text-left"> Sold By </th>
                                                      {/* <th className="xsm:text-sm sm:text-sm font-medium text-gray-100 px-4 py-2 text-left">Supplier</th> */}
                                                      <th className="xsm:text-sm sm:text-sm font-medium text-gray-100 px-4 py-2 text-left">Date Sold</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  {
                                                      report && report.reports ? (
                                                        report?.reports?.data?.monthly_report[0] ? (
                                                          report?.reports?.data?.monthly_report[0]?.product.map((product_item, index) => (
                                                                        <>
                                                        <tr key={index} className='border-b border-slate-200' >
                                                        <td className="text-smm font-light text-gray-900 px-2py-1 text-left"> {index + 1} </td>
                                                        <td className="text-smm font-light text-gray-900 px-2 py-1 text-left capitalize"> {product_item[0].productName} </td>
                                                        {/* <td className="text-smm font-lighte text-gray-900 px-2 py-1 text-left capitalize"> {product_item[0].brandName} </td> */}
                                                        <td className="text-smm font-light text-gray-900 px-3 py-1 text-left"> {report.reports.data.monthly_report[0].amount[index]} </td>
                                                        <td className="text-smm font-light text-gray-900 px-2 py-1 text-left"> {report.reports.data.monthly_report[0].price[index]} </td>
                                                        <td className="text-smm font-light text-gray-900 px-2 py-1 text-left"> { report.reports.data.monthly_report[0].amount[index] * report.reports.data.monthly_report[0].price[index] } </td>
                                                        <td className="text-smm font-lighte text-gray-900 px-2 py-1 text-left capitalize"> {report.reports.data.monthly_report[0].seller[index][0].firstName}  {report.reports.data.monthly_report[0].seller[index][0].lastName}</td>
                                                        {/* <td className={`text-smm font-lighte px-1 py-1 text-gray-900  text-left`}> { product_item[0].supplier } </td> */}
                                                        <td className={`text-smm font-light px-1 py-1 text-gray-900  text-left`}> { moment(report.reports.data.monthly_report[0].date[index]).format('YYYY-MM-DD-hh:mm') } </td>
                                                        
                                                    </tr>             
                                                                        </> 
                                                                    ))
                                                                
                                                                                                          
                                                            ) : 
                                                            <>
                                                             <tr>
                                                     <td className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse"> No record found </td>
                                                     <td colSpan={4} className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse"> No record found </td>
                                                     <td className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse">  </td>
                                                     <td className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse">  </td>
                                                     <td className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse">  </td>
                                                     <td className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse">  </td>
                                                 </tr>
                                                 </>
                                                      ) : 
                                                          <>
                                                               <tr>
                                                     <td className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse"> choose date range </td>
                                                     <td colSpan={6} className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse"> choose date range </td>
                                                     <td className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse"> </td>
                                                     <td className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse"> </td>
                                                     <td  className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse"> </td>
                                                     <td className="text-smm font-lighte text-gray-900 px-6 py-1 text-left animate-pulse"> </td>
                                                 </tr>
                                                          </>
                                                  }

                                                  {
                                                      report && report.reports? (
                                                          report && report.reports && report.reports.empty === false ? (
                                                              report.reports.data.monthly_report[0] ? (
                                                                <tr>
                                                                <td colSpan={4} className="text-lg font-bold text-sky-600 px-6 py-1 text-left"> Total Sales </td>
                                                                <td colSpan="4" className="text-lg font-bold text-sky-600 px-1.5 py-1 text-left"> { report.reports.data.monthly_report[0].total_sales } </td>
                                                             </tr>
                                                             ) :  null
                                                          ) : null
                                                      ) :  null
                                                  }

                                              </tbody>
                                          </table>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                  </div>
              </div>
       </div>
      </>
  )
}

export default Reports