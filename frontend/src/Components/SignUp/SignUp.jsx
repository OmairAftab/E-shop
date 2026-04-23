import React, { useState } from 'react'
import {AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai"
import { Link } from 'react-router-dom'
import {RxAvatar} from "react-icons/rx"

const SignUp = () => {

    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[visible,setVisible]=useState(false)
    const[avatar,setAvatar]=useState(null)



    const handleSubmit = (e) => {
        console.log(name,email,password,avatar)
    }


    const handleFileInputChange=(e)=>{
        const file=e.target.files[0];
        setAvatar(file)
    }



    return (
        <div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8'>

            <div className='sm:mx-auto sm:w-full sm:max-w-md'>

                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-600'>
                    Register as new User
                </h2>

            </div>



            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>


                    <form className='space-y-6' action='#' >


                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                Full name
                            </label>

                            <div className="mt-1">
                                <input type="text" name="text" autoComplete='text' required value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  focus:border-gray-500 sm:text-sm'/>
                            </div>
                        </div>
                        
                        
                        
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


                    

                        {/* div for file upload */}
                        <div>
                            <label htmlFor="avatar"
                            className='block text-sm font-medium text-gray-700'>

                            </label>

                            <div className='mt-2 flex items-center'>
                                <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                                    
                                        {avatar ? (
                                            <img
                                                src={URL.createObjectURL(avatar)}
                                                alt="avatar"
                                                className="h-full w-full object-cover rounded-full"
                                            />
                                            ) : (
                                            <RxAvatar className="h-8 w-8" />
                                            )}
                                </span>

                                <label htmlFor="file-input"
                                className='ml-5 flex items-center justify-center px-4 py-2 border-gray-300 text-sm text-gray-700 bg-white'>
                                        <span>Upload a file</span>
                                        <input type="file" name="avatar" accept='.jpg,.jpeg,.png' id="file-input" onChange={handleFileInputChange} 
                                        className='sr-only'
                                        />
                                </label>
                            </div>
                        </div>






                        
                        <div className='flex justify-center'>
                            <button type='submit'
                            className='bg-blue-600 w-80 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none '
                            >
                                Sign up
                            </button>
                        </div>



                        <div className='flex justify-start w-full'>
                              <h4>Already have an account?</h4>
                              <Link to="/login" className="ml-2 text-sm text-blue-600 hover:underline" >
                                Sign in
                              </Link>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default SignUp