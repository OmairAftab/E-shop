import React from 'react'
import styles from '../../Styles/styles'
import EventCard from '../Events/EventCard'
import { useSelector } from 'react-redux'

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

   // find the event with the highest sold_out count among all events wo hum homepage pe show karenge
  const mostSoldEvent =
    allEvents && allEvents.length !== 0
      ? allEvents.reduce((best, current) =>
          (current.sold_out || 0) > (best.sold_out || 0) ? current : best
        )
      : null;

  return (
    <div>
      {!isLoading && allEvents && allEvents.length !== 0 && (
        <div className='mt-7'>
          <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
              <h1 className='text-center'>Popular Event</h1>
            </div>

            <div className="w-full grid">
              <EventCard data={mostSoldEvent} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Events