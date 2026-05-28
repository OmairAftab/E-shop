import React from 'react'
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { AiOutlineCamera } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../Styles/styles';

const ProfileContent = ({active}) => {

  const {user} = useSelector((state) => state.user);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className="w-full">
      {
 //WHEN ACTIVE IS 1, SHOW THE PROFILE CONTENT AS WE MADE IN PROFILE SIDEBAR THAT ACTIVE ===1 WHEN PROFILE TAB IS OPENED
        active ===1 && (
          
          <>
           <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={
                  user && user.avatar && user.avatar.url
                    ? `${backend_url}${user.avatar.url}`
                    : 'https://via.placeholder.com/150'
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt={user && user.name ? user.name : 'Profile'}
              />

              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <AiOutlineCamera/>
              </div>
            </div>
          </div>


          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px]  h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>

          </>
        ) 
      }
    </div>
  )
}

export default ProfileContent