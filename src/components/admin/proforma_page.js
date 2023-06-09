import React, { useCallback, useEffect, useState } from 'react'

// import NavBar from '../navbar'
import { set, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// import { signupUser } from '../../store/actions/user_actions';
import image from '../../assets/images/clinton.png'
import NavBar from '../containers/header';
import SideNav from '../sideBar/sideNav';
import { getAllProducts, getProductById  } from '../../store/actions/product_actions';

import { useCart } from 'react-use-cart';
import { saleNow } from '../../store/actions/sales_actions';


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
    selling_price: Yup
    .string()
    .required()
    .trim(),
    amount: Yup
    .string()
    .required()
    .trim(),
    price : Yup
    .string()
    .trim(),
   unit: Yup
    .string()
    .required()
    .trim(),
    quantity : Yup
    .string()
    .required()
    .trim(),
    added_price : Yup
    .string()
    .trim()
})

function ProformaPage() {

    const navigate = useNavigate();
    const [reload , setReload] = useState(0);
    const [addedPrice, setAddedPrice] = useState(0);
    const [productAmount, setProductAmount] = useState(0)
    const [productPrice, setProductPrice] =  useState(0);
    // const [file, setFile] = useState("");
    const dispatch =  useDispatch()
    const params =  useParams()

    const product =  useSelector(state => state.products);
    // console.log(product.current_product)

    // console.log(params.id);
    const { addItem } =  useCart();

    // setTimeout(() => {
    //     if(reload < 5) {
    //         setReload(reload => reload + 1)
    //         dispatch( getProductById(params.id))
    //     }
    // }, 1500);

    // useEffect(() => {
    //     if(product  && reload < 4){
    //         console.log('loaded again')
    //         dispatch( getProductById(params.id) )
    //     }
    // },[params.id,product])

    

    const { register, handleSubmit, reset, formState : {errors, isValid, isDirty, isSubmitSuccessful} } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        shouldFocusError: true,
        resolver : yupResolver(schema)
    })

    const calcCost = ( cost) => {
        return ((cost * productAmount) + (addedPrice * productAmount ));
    }

    const total =  ((productPrice *  productAmount) + (addedPrice * productAmount ));

    const onSubmit = data => {
        data.id = params.id
        data.price =  total;

        console.log(data)
        // dispatch( saleNow(data) );
        addItem(data);
        
        setTimeout(() => {
            // window.location.reload(false)
           navigate('/proforma')
        }, 3000);
    }


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                productName: '',
                // middleName: '',
                buyingPrice: '',
                price: '',
                amount: '',
                unit: '',
                total_cost: '',
                quantity : '',
                price : '',
                added_price :''


            })
        }
    })
  return (
      <>
          <div className='flex w-full justify-between'>
            <SideNav />
          <div className='w-full' >
              <NavBar />
              <div className="bg-slate-50 py-10">
                  <div className="mx-auto w-10/12 lg:w-8/12 xl:w-8/12">
                      <div className="rounded-md shadow bg-white w-full">  
                          {
                            product?.current_product?.data?(
                                <>
                            <div className="w-32 h-32 mx-auto">
                                 <img src={image} alt="" className='h-32 w-32' />
                            </div>             
                                     <div className="p-2">
                              <p className="text-center text-3xl font-bold mb-4 text-sky-600 -mt-4">Add to Proforma</p>
                              <form onSubmit={handleSubmit(onSubmit)} className="py-2 px-1">
                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">
                                      <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="productName" className='text-sky-600'>Product Name</label> <br />
                                          <input type="text" placeholder='productName'  onClick={() => dispatch(getProductById(params.id))}
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${ errors.productName? "border-red-500" : "border-sky-500" }  `}
                                           defaultValue={product.current_product.data.productName}
                                           {...register("productName")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.firstName?.message }</span>
                                </div>
                                <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                              <label htmlFor="buyingPrice" className='text-sky-600'>Buying Price</label> <br />
                                    <input type="text" placeholder='buyingPrice'
                                     className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.buyingPrice? "border-red-500" : "border-sky-500"} `}
                                     defaultValue={product.current_product.data.buyingPrice}
                                     {...register("buyingPrice")}
                               />
                                    <span className="text-red-500 text-sm">{ errors.buyingPrice?.message }</span>
                          </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">

                            <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                              <label htmlFor="Lastname" className='text-sky-600'>Selling Price</label> <br />
                              <input name="" id=""
                                     className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.selling_price? "border-red-500" : "border-sky-500"} `}
                                     defaultValue={""}
                                     {...register("selling_price")}
                                     onChange = {(e) => setProductPrice(e.target.value ) }
                              />
                                    <span className="text-red-500 text-sm">{ errors.selling_price?.message }</span>
                          </div>

                          <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="sellingPrice" className='text-sky-600'>Product Amount</label> <br />
                                          <input type="tel" placeholder='sellingPrice'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.amount?"border-red-500" : "border-sky-500"}`}
                                           defaultValue={0}
                                           {...register("amount")}
                                           onChange = {(e) => setProductAmount(e.target.value ) }
                                     />
                                          <span className="text-red-500 text-sm">{ errors.amount?.message }</span>
                                </div>
                            
                            </div>

                            {/* <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">

                                <input type="hidden" placeholder='Units ' 
                                            //   className={`rounded-md border-2 w-11/12 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.unit?"border-red-500" : "border-sky-500"} `}
                                     defaultValue={product.current_product.data.quantity}
                                     {...register("quantity")}
                                    />

                                      <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="quantity" className='text-sky-600'>Total Cost</label> <br />
                                          <input type="tel" placeholder='total_cost'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.price?"border-red-500" : "border-sky-500"}`}
                                           defaultValue={""}
                                           value={calcCost(productPrice)}
                                           {...register("price")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.price?.message }</span>
                                </div>
                                
                            </div> */}

                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">
                            <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="supplier Address" className='text-sky-600'>Units</label> <br />
                                    <input type="text" placeholder='Units ' 
                                              className={`rounded-md border-2 w-11/12 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.unit?"border-red-500" : "border-sky-500"} `}
                                     defaultValue={""}
                                     {...register("unit")}
                                    />
                                    <span className="text-red-500 text-sm">{ errors.unit?.message }</span>
                                </div>

                                <input type="hidden" placeholder='Units ' 
                                            //   className={`rounded-md border-2 w-11/12 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.unit?"border-red-500" : "border-sky-500"} `}
                                     defaultValue={product.current_product.data.quantity}
                                     {...register("quantity")}
                                    />

                                      <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="quantity" className='text-sky-600'>Total Cost</label> <br />
                                          <input type="tel" placeholder='total_cost'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.price?"border-red-500" : "border-sky-500"}`}
                                           defaultValue={""}
                                           value={calcCost(productPrice)}
                                           {...register("price")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.price?.message }</span>
                                </div>
                                
                            </div>
                            
                            <div className="mx-auto w-9/12 py-4">            
                                  <button disabled={!isValid || !isDirty} style={{ width: '80%'}} className="rounded shadow px-2 mx-auto py-1 bg-sky-600 text-white font-medium">Submit</button>
                            </div>
                            
                              </form>
                          </div>
                                </>
                            )
                            : 
                            <>
                            <div className="text-lg font-medium text-center animate-pulse py-2"> Loading </div>
                            </>
                          }
                      </div>
                  </div>
              </div>
        </div>
          </div>
      </>
  )
}

export default ProformaPage