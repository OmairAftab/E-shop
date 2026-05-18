import React from 'react'
import Header from '../Components/Layout/Header'
import Hero from '../Components/Route/Hero/Hero'
import Categories from '../Components/Route/Categories/Categories'
import BestDeals from '../Components/Route/BestDeals/BestDeals'
import FeaturedProducts from '../Components/Route/FeaturedProducts/FeaturedProducts'
import Events from '../Components/Events/Events'
import Sponsored from '../Components/Route/Sponsored'

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
        <Categories/>
        <BestDeals/>
        <Events/>
        <FeaturedProducts/>
        <Sponsored/>
        
    </div>
  )
}

export default HomePage