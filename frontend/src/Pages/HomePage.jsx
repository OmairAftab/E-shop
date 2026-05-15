import React from 'react'
import Header from '../Components/Layout/Header'
import Hero from '../Components/Route/Hero/Hero'

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
    </div>
  )
}

export default HomePage