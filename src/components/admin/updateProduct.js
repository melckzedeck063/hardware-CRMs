import React, { useEffect, useState } from 'react'
// import NavBar from '../navbar'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
// import { signupUser } from '../../store/actions/user_actions';
import image from '../../assets/images/clinton.png'
import NavBar from '../containers/header';
import SideNav from '../sideBar/sideNav';
import { createProduct } from '../../store/actions/product_actions';

const schema = Yup.object({
    productName: Yup
    .string()
    .required()
    .trim(),
    // middleName: Yup
    // .string()
    // .required()
    // .trim(),
    buyingPrice: Yup
    .string()
    .required()
    .trim(),
    whole_sale: Yup
    .string()
    .required()
    .trim(),
    sellingPrice: Yup
    .string()
    .required()
    .trim(),
    quantity : Yup
    .string()
    .required()
    .trim(),
    memberPrice: Yup
    .string()
    .required()
    .trim(),
})

function NewRequest() {

    const navigate = useNavigate();
    // const [file, setFile] = useState("");
    const dispatch =  useDispatch()

    // const formData = new FormData();
    // formData.append('file', file)

    const { register, handleSubmit, reset, formState : {errors, isValid, isDirty, isSubmitSuccessful} } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        shouldFocusError: true,
        resolver : yupResolver(schema)
    })

    const onSubmit = data => {
        // console.log(data)
        dispatch(createProduct(data) );
    }


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                productName: '',
                // middleName: '',
                buyingPrice: '',
                whole_sale: '',
                quantity: '',
                sellingPrice: '',
                memberPrice: '',


            })
        }
    })
  return (
      <>
          <div className='flex w-full justify-between'>
            <SideNav />
          <div className='w-full'>
              <NavBar />
              <div className="bg-slate-50 py-10">
                  <div className="mx-auto w-11/12 lg:w-8/12 xl:w-8/12">
                      <div className="rounded-md shadow bg-white w-full">  
                            <div className="w-32 h-32 mx-auto">
                                 <img src={image} alt="" className='h-32 w-32' />
                            </div>             
                          <div className="p-2">
                              <p className="text-center text-3xl font-bold mb-4 text-sky-600 -mt-4">Update Product</p>
                              <form onSubmit={handleSubmit(onSubmit)} className="py-2 px-1">
                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">
                                      <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="productName" className='text-sky-600'>Product Name</label> <br />
                                          <input type="text" placeholder='productName'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${ errors.productName? "border-red-500" : "border-sky-500" }  `}
                                           defaultValue={""}
                                           {...register("productName")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.firstName?.message }</span>
                                </div>
                                <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                              <label htmlFor="buyingPrice" className='text-sky-600'>Buying Price</label> <br />
                                    <input type="text" placeholder='buyingPrice'
                                     className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.buyingPrice? "border-red-500" : "border-sky-500"} `}
                                     defaultValue={""}
                                     {...register("buyingPrice")}
                               />
                                    <span className="text-red-500 text-sm">{ errors.buyingPrice?.message }</span>
                          </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">

                            <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                              <label htmlFor="Lastname" className='text-sky-600'>Whole Sale</label> <br />
                                    <input type="text" placeholder='Enter whole sale price' 
                                     className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.whole_sale? "border-red-500" : "border-sky-500"} `}
                                     defaultValue={""}
                                     {...register("whole_sale")}
                               />
                                    <span className="text-red-500 text-sm">{ errors.whole_sale?.message }</span>
                          </div>

                          <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="sellingPrice" className='text-sky-600'>Selling Price</label> <br />
                                          <input type="tel" placeholder='sellingPrice'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.sellingPrice?"border-red-500" : "border-sky-500"}`}
                                           defaultValue={""}
                                           {...register("sellingPrice")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.sellingPrice?.message }</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">
                            <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="supplier Address" className='text-sky-600'>Member Price</label> <br />
                                    <input type="text" placeholder='memberPrice ' 
                                              className={`rounded-md border-2 w-11/12 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.memberPrice?"border-red-500" : "border-sky-500"} `}
                                     defaultValue={""}
                                     {...register("memberPrice")}
                                    />
                                    <span className="text-red-500 text-sm">{ errors.memberPrice?.message }</span>
                                </div>

                                      <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="quantity" className='text-sky-600'>Quantity</label> <br />
                                          <input type="tel" placeholder='quantity'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.quantity?"border-red-500" : "border-sky-500"}`}
                                           defaultValue={""}
                                           {...register("quantity")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.quantity?.message }</span>
                                </div>
                                
                            </div>
                            
                            <div className="mx-auto w-9/12 py-4">            
                                  <button disabled={!isValid || !isDirty} style={{ width: '80%'}} className="rounded shadow px-2 mx-auto py-1 bg-sky-600 text-white font-medium">Submit</button>
                            </div>
                            
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
        </div>
          </div>
      </>
  )
}

export default NewRequest