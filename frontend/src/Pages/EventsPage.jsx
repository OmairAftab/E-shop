import React from 'react'
import Header from "../Components/Layout/Header";
import EventCard from '../Components/Events/EventCard';
import Footer from '../Components/Layout/Footer';

const EventsPage = () => {
  return (
    <div>
        <Header activeHeading={4} />
        <EventCard active={true} />
        <Footer/>
    </div>
  )
}

export default EventsPage