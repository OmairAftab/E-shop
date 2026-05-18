import React from 'react'
import styles from '../../Styles/styles'

const EventCard = () => {
  return (
    <div
      className={`w-full block bg-white rounded-lg lg:flex p-2`}
    >

        <div className="w-full lg:-w[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>

      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}> IPhone 14 pro max </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nisi iusto esse omnis? Tenetur blanditiis vitae architecto dignissimos sit repellat enim fuga nihil, quos, velit optio natus mollitia, soluta laudantium ducimus error quasi magnam nesciunt adipisci dolor labore corporis earum! Velit sint iure placeat aperiam pariatur voluptate voluptates, excepturi quidem qui sequi aut iusto autem recusandae dolorum? Rem quibusdam, ipsa, quos aspernatur perspiciatis tenetur facere ducimus tempore obcaecati ratione ipsum quis excepturi nobis temporibus, dolores tempora beatae odio nam veritatis cum atque a! Quaerat voluptates necessitatibus recusandae? Officia, aliquid mollitia. Vitae voluptate incidunt ad magnam minima natus ducimus voluptatibus quas.</p>
        
        <div className="flex py-2 mt-3 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              100$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              120$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            50 sold
          </span>
        </div>





{/* CURRENTLY DOING PART 1 OF MULTIVENDOR AND ITS NOT REQUIRED TO MAKE IT RESPONSIVE MEAN CURRENTLY USING STATIC DAT.. */}
{/* WILL UN-COMMENT THIS AFTER AND REMOVE ABOVE PART WHICH IS STATIC */}

      {/* <div className="w-full lg:-w[50%] m-auto">
        <img src={`${data.images[0]?.url}`} alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span> */}
        
    </div>

    </div>
  )
}

export default EventCard;