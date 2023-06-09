import React, { useEffect } from 'react'
// import NavBar from '../navbar'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
// import { signupUser } from '../../store/actions/user_actions';
import image from '../../assets/images/clinton.png'
import { registerCustomer, signUpUser } from '../../store/actions/user_actions';
import SideNav from '../sideBar/sideNav';
import NavBar from '../containers/header';

const schema = Yup.object({
    firstName: Yup
    .string()
    .required()
    .trim(),
    lastName: Yup
    .string()
    .required()
    .trim(),
    telephone : Yup
    .string()
    .required()
    .trim(),
    email: Yup
    .string()
    .email()
    .trim(),
    tin: Yup
    .string()
    .trim(),
    vrn : Yup
    .string()
    .trim()
})

function AddCustomer () {

    const navigate = useNavigate();
    const dispatch =  useDispatch()

    const { register, handleSubmit, reset, formState : {errors, isValid, isDirty, isSubmitSuccessful} } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        shouldFocusError: true,
        resolver : yupResolver(schema)
    })

    const onSubmit = data => {
        // console.log(data)
        dispatch( registerCustomer(data) )
    }


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstName: '',
                // middleName: '',
                lastName: '',
                telephone: '',
                email: '',
                vrn: '',
                tin : ''
            })
        }
    })
  return (
      <>
          <div className="flex w-full">
        <SideNav/>
       <div className='w-full bg-white'>
          <NavBar  />
              {/* <NavBar /> */}
              <div className="bg-slate-50 py-10">
                  <div className="mx-auto w-11/12 lg:w-7/12 xl:w-7/12">
                      <div className="rounded-md shadow bg-white w-full">  
                      <div className="w-32 h-32 mx-auto">
                                 <img src={image} alt="" className='h-32 w-32' />
                            </div>               
                          <div className="p-2">
                              <p className="text-center text-3xl font-bold mb-4 text-sky-600">Add Customer</p>
                              <form onSubmit={handleSubmit(onSubmit)} className="py-2 px-1">
                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">
                                      <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="Firstname" className='text-sky-600'>Firstname</label> <br />
                                          <input type="text" placeholder='Firstname'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${ errors.firstName? "border-red-500" : "border-sky-500" }  `}
                                           defaultValue={""}
                                           {...register("firstName")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.firstName?.message }</span>
                                </div>
                                <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                              <label htmlFor="Lastname" className='text-sky-600'>Lastname</label> <br />
                                    <input type="text" placeholder='Lastname'
                                     className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.lastName? "border-red-500" : "border-sky-500"} `}
                                     defaultValue={""}
                                     {...register("lastName")}
                               />
                                    <span className="text-red-500 text-sm">{ errors.lastName?.message }</span>
                          </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">
                                      <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="Telephone" className='text-sky-600'>Telephone</label> <br />
                                          <input type="tel" placeholder='Telephone'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.telephone?"border-red-500" : "border-sky-500"}`}
                                           defaultValue={""}
                                           {...register("telephone")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.telephone?.message }</span>
                                </div>
                                <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="Email Address" className='text-sky-600'>Email Address</label> <br />
                                    <input type="text" placeholder='Email Address' 
                                              className={`rounded-md border-2 w-11/12 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.email?"border-red-500" : "border-sky-500"} `}
                                     defaultValue={""}
                                     {...register("email")}
                                    />
                                    <span className="text-red-500 text-sm">{ errors.email?.message }</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">
                                      <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="Password" className='text-sky-600'>TIN</label> <br />
                                          <input type="text" placeholder='Tin Number'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.tin?"border-red-500" : "border-sky-500"} `}
                                           defaultValue={""}
                                           {...register("tin")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.tin?.message }</span>
                                </div>
                                <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="Confirm Password" className='text-sky-600'>VRN</label> <br />
                                    <input type="text" placeholder='vrn' 
                                              className={`rounded-md border-2 w-11/12  focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.vrn?"border-red-500" : "border-sky-500"} `}
                                     defaultValue={""}
                                     {...register("vrn")}
                                    />
                                    <span className="text-red-500 text-sm">{ errors.vrn?.message }</span>
                                </div>
                            </div>
                            <div className="mx-auto w-9/12 py-4">            
                                  <button disabled={!isValid || !isDirty} style={{ width: '80%'}} className="rounded shadow px-2 mx-auto py-1 bg-sky-600 text-white font-medium">Submit</button>
                            </div>
                            {/* <div className="py-3">
                                <p className="font-medium mb-3 text-center text-sky-600">Already have an account?</p>
                                <div className="w-5/12  md:w-1/4 lg:w-1/4 xl:w-1/4 mx-auto mb-4 pb-8">       
                                    <button onClick={() => navigate('/')} className="rounded-md text-center border-2 text-sky-600 border-sky-600 hover:bg-sky-600 hover:shadow-xl hover:text-white font-medium shadow-m px-4 py-1">Sign In</button>
                                </div>
                            </div> */}
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

export default AddCustomer