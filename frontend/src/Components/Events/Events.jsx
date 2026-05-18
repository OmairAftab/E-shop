import React from 'react'
import styles from '../../Styles/styles'
import EventCard from '../Events/EventCard'

const Events = () => {
  return (
    <div className='mt-7'>
          <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
              <h1 className='text-center'>Popular Event</h1>
            </div>


            <div className="w-full grid">

                <EventCard/>
            </div>
    
                
    
    
         </div>
        </div>
  )
}

export default Events