import React from 'react'
import { useSelector } from 'react-redux'
import Header from "../Components/Layout/Header";
import EventCard from '../Components/Events/EventCard';
import Footer from '../Components/Layout/Footer';

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <p className="text-lg font-medium">Loading events...</p>
        </div>
      ) : (
        <div>
          <Header activeHeading={4} />
          <div className="w-11/12 mx-auto my-10 flex flex-col gap-8">
            {allEvents && allEvents.length !== 0 ? (
              allEvents.map((event, index) => (
                <EventCard key={event._id || index} active={true} data={event} />
              ))
            ) : (
              <h4 className="text-center text-[18px] font-[500] my-10">
                No active events found!
              </h4>
            )}
          </div>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default EventsPage