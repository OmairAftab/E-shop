import React from 'react'
import Header from '../Components/Layout/Header'
import styles from '../Styles/styles'
import ProfileSideBar from '../Components/Profile/ProfileSidebar'
import ProfileContent from '../Components/Profile/ProfileContent'
import { useState } from 'react'

const ProfilePage = () => {
    const [active, setActive] = useState(1);

  return (
    <div>
        <Header/>
        <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
        </div>


    </div>
  )
}

export default ProfilePage