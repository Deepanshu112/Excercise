import React, { useContext, useEffect, useState } from 'react';
import { useAxiosFetch } from '../../hooks/useAxiosFetch';
import { Transition } from '@headlessui/react';
import {Link} from 'react-router-dom';
import useUser from "../../hooks/useUser";
import AuthProvider, { AuthContext } from '../../utilities/Providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify' ;

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const {currentUser} = useUser();
  const role = currentUser?.role;
  const [enrolledC1asses, setEnrolledC1asses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  // const {user} = useContext (AuthProvider);
  const { user } = useContext(AuthContext);
  console.log(user)

  const handleHover = (index) => {
    setHoveredCard (index);
  };

  const handleSelect = () => {
    axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
    .then(res => setEnrolledC1asses(res.data)).catch(err => console.log(err))
    if(!currentUser) {
      return toast.error("Please Login!!");
    }

    axios.secure.get(`/cart-item/${id}/email?${currentUser.email}`)
    .then(res => {
      if (res.data.error === "Already Selected") {
        return toast.error("Already Selected!")
      } else if (enrolledClasses.find(item => item.classes_id == id)) {
        return toast.error("Already Enrolled")
      } else {
        const data = {
        userId: id,
        userMail: currentUser.email,
        data: new Date()
      }

      toast.promise(axiosSecure.post('/add-to-cart', data))
        .then(res => {
          console.log(res.data);
        }),
        {
          pending: 'Selecting...',
          success: {
              render({data}){
                return "Selected Successfully"
              }
            },
          error: {
            render({data}){
              return `Error: ${data.message}`
            }
          }
        }
      }      
    })
  }

  useEffect (() => {
    axiosFetch.get('/classes').then((res) => setClasses (res.data)).catch((err) => console.log(err))
  }, []);

  console.log(classes)
  return(
    <div>
      <div className='mt-20 pt-3'>
        <h1 className='text-4x1 font-bold text-center ☐ text-secondary' >Classes</h1>
      </div>

    <div className='my-16 w-[90%] mx-auto grid sm: grid-cols-2 md: grid-cols-3 lg:grid-cols-4 gap-8 '>
    {
      classes.map((cls, index) => (
        <div
        onMouseLeave={() => handleHover (null)}
        key={index}
        className={`relative hover:-translate-y-2 duration-150 hover: ring-[2px] ☐ hover:ring-secondary w-64
        h-[350px] mx-auto ${cls.availableSeats < 1 ? 'bg-red-300' : 'bg-white'} dark: bg-slate-600
        rounded-1g shadow-lg overflow-hidden cursor-pointer`}
        onMouseEnter={() => handleHover (index)
        }
        >
        <div className='relative h-48'>
          <div className={`absolute inset-0 ☐ bg-black opacity-0 transition-opacity duration-300 $
          {hoveredCard === index ? "opacity-60" : ""}`}/>
          <img src={cls.image} alt="" className='object-cover w-full h-full'/>

          <Transition
            show={hoveredCard === index}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            Leave="transition-opacity duration-150"
            LeaveFrom="opacity-100"
            LeaveTo="opacity-0"
          >
            <div className='absolute inset-0 flex items-center justify-center'>
              <button onClick={() => handleSelect(cls._id)} title={role == 'admin' || role === 
              'instructor' ? 'Instructor/Admin Can not be able to select' ? cls/availableSeats < 1 : 'No seat available' : "you can select classes"} 
              disabled={role === "admin" || role === 'instructor' || cls.availableSeats < 1}
              className='px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700'>Add to Cart</button>
            </div>
          </Transition>           
      </div>
      {/* details */}

      <div className="px-6 py-2">
        <h3 className="font-semibold mb-1">{cls.name}</h3>
        <p className="text-gray-500 text-xs">Instructor: {cls.instructorName}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-600 text-xs">Available Seats: {cls.availableSeats}</span>
          <span className="text-green-500 font-semibold"> ${cls.price}</span>

        </div>

        <Link to={`/class/${cls._id}` }><button className="px-4 py-2 mt-4 w-full mx-auto text-white
        disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700">View</button> </Link>
      </div>
    </div>
  ))
}
    </div>
    </div>
  )
}
export default Classes
