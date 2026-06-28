import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../Styles/styles'
import CountDown from './CountDown'
import { backend_url } from '../../server'

const EventCard = ({ active, data }) => {

  const resolveImageUrl = (image) => {
    if (!image) return null;

    if (typeof image === 'string') {
      if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
        return image;
      }

      if (image.startsWith('/')) {
        return `${backend_url}${image.replace(/^\//, '')}`;
      }

      return `${backend_url}uploads/${image}`;
    }

    if (typeof image === 'object') {
      const objectUrl = image.url || image.src;

      if (!objectUrl) return null;

      if (objectUrl.startsWith('http://') || objectUrl.startsWith('https://') || objectUrl.startsWith('data:')) {
        return objectUrl;
      }

      if (objectUrl.startsWith('/')) {
        return `${backend_url}${objectUrl.replace(/^\//, '')}`;
      }

      return `${backend_url}uploads/${objectUrl}`;
    }

    return null;
  };

  const imageCandidates = [
    ...(Array.isArray(data?.images) ? data.images : []),
    ...(Array.isArray(data?.image_Url) ? data.image_Url : []),
    data?.image_Url,
    data?.image,
    data?.thumbnail,
  ];
  const imageSource = imageCandidates.map(resolveImageUrl).find(Boolean);
  const imgSrc = imageSource || "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg";

  return (
    <div className={`w-full block border-3 border-blue-900  bg-white rounded-lg lg:flex p-2 ${active ? "unset" : "mb-12"}`}>
      <div className="w-full lg:w-[50%] m-auto flex justify-center items-center">
        <img 
          src={imgSrc} 
          alt={data?.name || "Event"} 
          className="max-h-[300px] object-contain"
        />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center p-4">
        <h2 className={`${styles.productTitle}`}>{data?.name || "Event Title"}</h2>
        <p className="text-gray-600 text-[14px] mt-2 line-clamp-4 leading-relaxed">
          {data?.description || "No description available for this event."}
        </p>
        
        <div className="flex py-2 mt-3 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice ? `${data.originalPrice}$` : ""}
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice ? `${data.discountPrice}$` : `${data?.price || 0}$`}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out || 0} sold
          </span>
        </div>

        <CountDown data={data} />
        
        <div className="flex items-center gap-4 mt-5">
          <Link to={`/product/${data?.name?.replace(/\s+/g, "-")}?isEvent=true`} className={`${styles.button} text-white !mt-0 !h-10 flex items-center justify-center !rounded`}>
            See Details
          </Link>
          <div className={`${styles.button} text-white bg-black !mt-0 !h-10 flex items-center justify-center !rounded cursor-pointer`}>
            Buy Now
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard;