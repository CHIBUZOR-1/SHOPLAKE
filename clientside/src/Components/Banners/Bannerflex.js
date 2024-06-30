import React, { useEffect, useState } from 'react'
import { assets } from '../Assets/Assets'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import './Bannerflex.css';
const Bannerflex = () => {
    const [currentImg, setCurrentImg] = useState(0);
    const flexImages = [
        assets.Banner_3,
        assets.Banner_5,
        assets.Asus_BANNER2,
        assets.Banner_7,
        assets.Banner_8,
        assets.Banner_9,
        assets.Artboard_1
    ]

    const nextFlex = () => {
      if(flexImages.length - 1 > currentImg) {
        setCurrentImg(prev=> prev + 1)
      }
    }

    const prevFlex = () => {
      if(currentImg !== 0) {
        setCurrentImg(prev=> prev - 1)
      }
    }

    useEffect(()=> {
      const interval = setInterval(()=> {
        if(flexImages.length - 1 > currentImg) {
          nextFlex()
        } else {
          setCurrentImg(0)
        }
      }, 4000)
      return ()=> clearInterval(interval)
      // eslint-disable-next-line
    }, [currentImg])
  return (
    <div className='flexy'>
        <div className='flexy1'>
            <div className='bt1'>
                <div className='bt2'>
                    <button onClick={prevFlex} className='bt3'>
                    <FaAngleLeft />
                    </button>
                    <button onClick={nextFlex} className='bt3'>
                    <FaAngleRight />
                    </button>
                </div>
            </div>

            <div className='flexyo'>
              {
                flexImages.map((images, i) => {
                    return (
                    <div className='flximg' key={images + 1} style={{transform: `translateX(-${currentImg * 100}%)`}}>
                        <img src={images} alt="" />
                    </div>
                    )
                })
              }  
            </div>
            
        
        </div>
        
    </div>
  )
}

export default Bannerflex