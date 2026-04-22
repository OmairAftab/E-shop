import React, { useState } from 'react'
import {AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai"
import { Link } from 'react-router-dom'

const Login = () => {

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[visible,setVisible]=useState(false)

    return (
        <div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>

            <div className='sm:mx-auto sm:w-full sm:max-w-md'>

                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-600'>
                    Sign in to your account
                </h2>

            </div>



            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>


                    <form className='space-y-6' action='#' >
                        
                        
                        
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                Email address
                            </label>

                            <div className="mt-1">
                                <input type="email" name="email" autoComplete='email' required value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  focus:border-gray-500 sm:text-sm'/>
                            </div>
                        </div>





                        
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                                Password
                            </label>

                            <div className="mt-1 relative">
                                <input type={visible? "text" : "password"}
                                 name="password" autoComplete='current-password' required value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  focus:border-gray-500 sm:text-sm'/>

                                
                               {visible ? (
                                <AiOutlineEye
                                 className="absolute right-2 top-2 cursor-pointer"
                                 size={25}
                                 onClick={() => setVisible(false)}
                                />
                                 ) : (
                                 <AiOutlineEyeInvisible
                                  className="absolute right-2 top-2 cursor-pointer"
                                 size={25}
                                 onClick={() => setVisible(true)}
                                 />
                              )}
                            </div>

                            

                            
                        </div>


                    


                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                
                                <input type="checkbox" name='remember-me' id='remember-me'
                                className='h-4 w-4 text-blue-600 border-gray-600 rounded'
                                />
                               
                                <label htmlFor="remember-me"
                                className='ml-2 block text-sm text-gray-700'
                                >
                                    Remember me
                                </label>

                            </div>
                            
                            <a href=".forgot-password" className="text-sm text-blue-600">
                                Forgot your password?
                            </a>

                            
                        </div>

                        
                        <div className='flex justify-center'>
                            <button type='submit'
                            className='bg-blue-600 w-80 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none '
                            >
                                Sign in
                            </button>
                        </div>



                        <div className='flex justify-start w-full'>
                              <h4>Don't have any account?</h4>
                              <Link to="/sign-up" className="ml-2 text-sm text-blue-600 hover:underline" >
                                Sign up
                              </Link>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default Login