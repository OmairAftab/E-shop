import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from '../../Styles/styles';

const ProductDetail = ({ data } ) => {

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="bg-white">

        {
            data ?(
                
                <>
                    <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                        <div className="w-full py-5">
                             <div className="block w-full 800px:flex">
                                <div className="w-full 800px:w-[50%]">
                                    <img src={data.image_Url[select].url} alt="" className="w-[80%] h-[400px] object-contain" /> 
                                   
                                   
                                    <div className="flex">
                                    <div
                                      className={`${
                                      select === 0 ? "null" : "null"} 
                                      cursor-pointer`}
                                    >
                                    <img
                                        src={data.image_Url[0].url}
                                        alt=""
                                        className="h-[200px] overflow-hidden mr-3 mt-3 border"
                                        onClick={() => setSelect(0)}
                                    />
                                    </div>


                                    { 
                                        data.image_Url[1].url && (
                                            <div
                                      className={`${
                                      select === 1 ? "null" : "null"} 
                                      cursor-pointer`}
                                    >
                                    <img
                                        src={data.image_Url[1].url}
                                        alt=""
                                        className="h-[200px] overflow-hidden mr-3 mt-3 border"
                                        onClick={() => setSelect(1)}
                                    />

                                    </div>
                                        )
                                    }


                                    </div>
                                    

                                </div>
                             </div>
                        </div>
                    </div>
                </>

            ) : null
        }
    </div>
  )
}

export default ProductDetail