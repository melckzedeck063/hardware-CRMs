import React, { useEffect, useState } from 'react'
// import NavBar from '../navbar'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// import { signupUser } from '../../store/actions/user_actions';
import image from '../../assets/images/clinton.png'
import { getUserById, signUpUser } from '../../store/actions/user_actions';
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
    gender: Yup
    .string()
    .required()
    .trim(),
    role: Yup
    .string()
    .required()
    .trim(),
    telephone : Yup
    .string()
    .required()
    .trim(),
    email: Yup
    .string()
    .required()
    .email()
    .trim(),
    
})

function UpdateUser() {

    const navigate = useNavigate();
    const dispatch =  useDispatch()
    const params = useParams();
    const [reload, setReload] = useState(0);

    const  user = useSelector(state =>  state.users)
    // console.log(user.current_user)

    setTimeout(() => {
        if(reload < 5){
            setReload(reload  =>  reload + 1)
        }
    }, 1000);

    useEffect(() => {
        if(user &&  user.current_user === null && reload <  3){
            dispatch( getUserById(params.id) )
        }
    })

    const { register, handleSubmit, reset, formState : {errors, isValid, isDirty, isSubmitSuccessful} } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        shouldFocusError: true,
        resolver : yupResolver(schema)
    })

    const onSubmit = data => {
        console.log(data)
        // dispatch( UpdateUser(data) )
    }


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstName: '',
                // middleName: '',
                lastName: '',
                role: '',
                telephone: '',
                email: '',
                
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
                  <div className="mx-auto w-11/12 lg:w-8/12 xl:w-8/12">
                      <div className="rounded-md shadow bg-white w-full">  
                     {
                        user?.current_user?.data?.data?(
                            <>
                               <div className="w-32 h-32 mx-auto">
                                 <img src={image} alt="" className='h-32 w-32' />
                            </div>               
                          <div className="p-2">
                              <p className="text-center text-3xl font-bold mb-4 text-sky-600">Update User</p>
                              <form onSubmit={handleSubmit(onSubmit)} className="py-2 px-1">
                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">
                                      <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="Firstname" className='text-sky-600'>Firstname</label> <br />
                                          <input type="text" placeholder='Firstname'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${ errors.firstName? "border-red-500" : "border-sky-500" }  `}
                                           defaultValue={user.current_user.data.data.firstName}
                                           {...register("firstName")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.firstName?.message }</span>
                                </div>
                                <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                              <label htmlFor="Lastname" className='text-sky-600'>Lastname</label> <br />
                                    <input type="text" placeholder='Lastname'
                                     className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.lastName? "border-red-500" : "border-sky-500"} `}
                                     defaultValue={user.current_user.data.data.lastName}
                                     {...register("lastName")}
                               />
                                    <span className="text-red-500 text-sm">{ errors.lastName?.message }</span>
                          </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">

                            <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                              <label htmlFor="Lastname" className='text-sky-600'>Role</label> <br />
                                    <input type='text' name="" placeholder='User role'
                                     className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.role? "border-red-500" : "border-sky-500"} `}
                                     defaultValue={user.current_user.data.data.role}
                                     {...register("role")}
                                    />
                               
                                    <span className="text-red-500 text-sm">{ errors.role?.message }</span>
                          </div>

                          <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="Telephone" className='text-sky-600'>Gender</label> <br />
                                          <input type="tel" placeholder='gender'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.gender?"border-red-500" : "border-sky-500"}`}
                                           defaultValue={user.current_user.data.data.gender}
                                           {...register("gender")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.gender?.message }</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1 w-full mx-auto mb-3">
                                      <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="Telephone" className='text-sky-600'>Telephone</label> <br />
                                          <input type="tel" placeholder='Telephone'
                                           className={`rounded-md w-11/12 border-2 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.telephone?"border-red-500" : "border-sky-500"}`}
                                           defaultValue={user.current_user.data.data.telephone}
                                           {...register("telephone")}
                                     />
                                          <span className="text-red-500 text-sm">{ errors.telephone?.message }</span>
                                </div>
                                <div className="w-10/12 xsm:w-full sm:w-11/12 mx-auto">
                                    <label htmlFor="Email Address" className='text-sky-600'>Email Address</label> <br />
                                    <input type="text" placeholder='Email Address' 
                                              className={`rounded-md border-2 w-11/12 focus:outline-none px-2 xl:py-2 lg:py-2 md:py-2 py-1 ${errors.email?"border-red-500" : "border-sky-500"} `}
                                     defaultValue={user.current_user.data.data.email}
                                     {...register("email")}
                                    />
                                    <span className="text-red-500 text-sm">{ errors.email?.message }</span>
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
                            </>
                        )
                        : 
                        <div className="py-2 text-lg font-medium text-center text-blue-400 animate-pulse"> Loading </div>
                     }
                      </div>
                  </div>
              </div>
              </div>
        </div>
      </>
  )
}

export default UpdateUser