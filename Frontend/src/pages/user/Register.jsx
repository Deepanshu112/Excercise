import React from 'react';
import { useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Register = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className='flex justify-center items-center pt-14 bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold text-center mb-6'>Please Register</h2>  


        {/* form data */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor="name" className='block text-gray-700 font-bold mb-2'> 
              <AiOutlineUser className='inline-block mr-2 mb-1 text-lg'/>
                Name
              </label>
              <input type="text" placeholder='Enter your name' {...register("name", { required: true })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:border-blue-300'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor="email" className='block text-gray-700 font-bold mb-2'> 
              <AiOutlineMail className='inline-block mr-2 mb-1 text-lg'/>
                Email
              </label>
              <input type="text" placeholder='Enter your Email' {...register("name", { required: true })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:border-blue-300'
              />
            </div>
          </div>

          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor="password" className='block text-gray-700 font-bold mb-2'> 
              <AiOutlineLock className='inline-block mr-2 mb-1 text-lg'/>
                Password
              </label>
              <input type="password" placeholder='Enter password' {...register("password", { required: true })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:border-blue-300'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor="confirmpassword" className='block text-gray-700 font-bold mb-2'> 
              <AiOutlineLock className='inline-block mr-2 mb-1 text-lg'/>
                Confirm Password
              </label>
              <input type="password" placeholder='Confirm your Password' {...register("confirmpassword", { required: true, validate: (value) => value === password || "Password does not match" })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:border-blue-300'
              />
            </div>
          </div>

          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor="PhoneNumber" className='block text-gray-700 font-bold mb-2'> 
              <AiOutlinePhone className='inline-block mr-2 mb-1 text-lg'/>
                Phone Number
              </label>
              <input type="tel" placeholder='+91 4632746732' {...register("PhoneNumber", { required: true })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:border-blue-300'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor="photoURL" className='block text-gray-700 font-bold mb-2'> 
              <AiOutlinePicture className='inline-block mr-2 mb-1 text-lg'/>
                Email
              </label>
              <input type="text" placeholder='Enter URL' {...register("photoURL", { required: true })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:border-blue-300'
              />
            </div>
          </div>

          <div>
            <div className='mb-4'>
              <label htmlFor="PhoneNumber" className='block text-gray-700 font-bold mb-2'> 
              <AiOutlineUser className='inline-block mr-2 mb-1 text-lg'/>
                Gender
              </label>
              <select {...register("gender", {required: true})} className='w-full border border-gray-300 rounded-md py-2 px-4 focus:border-blue-300 focus:ring focus:outline-none'>
                <option value="">Select Gender</option>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor="PhoneNumber" className='block text-gray-700 font-bold mb-2'> 
              <HiOutlineLocationMarker className='inline-block mr-2 mb-1 text-lg'/>
                Address
              </label>
              <textarea {...register("address",{ required: true })} rows="3" 
              className='w-full border border-gray-300 rounded-md py-2 px-4 focus:border-blue-300 focus:ring focus:outline-none'
              placeholder='Enter address'
              ></textarea>
            </div>

            
            
          </div>

          <div className='text-center'>
            <button type='submit' className='bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md'>Register</button>
            {
                errors.password && (<div className='text-red-500 text-sm w-full mt-1'>
                    <p>Password doesn't match!</p>
                </div>)
            }
          </div>
        </form>
        <p>
            Already have a account? <Link to="/login" className='underline text-secondary'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;