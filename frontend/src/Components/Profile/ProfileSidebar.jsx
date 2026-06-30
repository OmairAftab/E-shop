import React from 'react'
import { useNavigate } from 'react-router-dom';
import { RxPerson } from 'react-icons/rx';
import { HiOutlineShoppingBag, HiOutlineReceiptRefund } from 'react-icons/hi';
import { AiOutlineMessage, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { TbAddressBook } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/user';
import { toast } from 'react-toastify';

const ProfileSidebar = ({active, setActive}) => {
    const navigate = useNavigate();


    // function for logout
    const dispatch = useDispatch();

    const logoutHandler = async () => {
      try {
        const res = await dispatch(logoutUser());
        navigate('/login');
        const msg = res?.message || res?.data?.message || (res && res.message) || "Logged out successfully";
        toast.success(msg);
       
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || 'Logout failed');
      }
    };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">

      {/* Profile tab — turns red when active===1 */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(1)}>
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span className={`pl-3 ${active === 1 ? "text-[red]" : ""} 800px:block hidden`}>
          Profile
        </span>
      </div>



      {/* Orders tab — turns red when active===2 */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(2)}>
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span className={`pl-3 ${active === 2 ? "text-[red]" : ""} 800px:block hidden`}>
          Orders
        </span>
      </div>



      {/* Refunds tab — turns red when active===3 */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(3)}>
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span className={`pl-3 ${active === 3 ? "text-[red]" : ""} 800px:block hidden`}>
          Refunds
        </span>
      </div>



      {/* Inbox tab — turns red when active===4 AND navigates to /inbox */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(4) || navigate("/inbox")}>
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span className={`pl-3 ${active === 4 ? "text-[red]" : ""} 800px:block hidden`}>
          Inbox
        </span>
      </div>



      {/* Track Order tab — turns red when active===5 */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(5)}>
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span className={`pl-3 ${active === 5 ? "text-[red]" : ""} 800px:block hidden`}>
          Track Order
        </span>
      </div>



      {/* Change Password tab — turns red when active===6 */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(6)}>
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span className={`pl-3 ${active === 6 ? "text-[red]" : ""} 800px:block hidden`}>
          Change Password
        </span>
      </div>



      {/* Address tab — turns red when active===7 */}
      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(7)}>
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span className={`pl-3 ${active === 7 ? "text-[red]" : ""} 800px:block hidden`}>
          Address
        </span>
      </div>


      <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => { setActive(8); logoutHandler(); }}>
        <AiOutlineLogout size={20} color={active === 8 ? "red" : ""} />
        <span className={`pl-3 ${active === 8 ? "text-[red]" : ""} 800px:block hidden`}>
          Log out
        </span>
      </div>

    </div>
  )
}

export default ProfileSidebar