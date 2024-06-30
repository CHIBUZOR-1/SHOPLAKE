import React, { useCallback } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import './ProductDisplay.css'
import { useState } from 'react';
import { usePass } from '../../Context/lakeContext';
import { toast } from 'react-toastify';
const ProductDisplay = ({product}) => {
    const {addToCart} = usePass();
    const [zoomy, setZoomy] = useState({
        x: 0,
        y: 0
    });

    const [zoomImg, setZoomImg] = useState(false);

    const handleZoom = useCallback((e) => {
        setZoomImg(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()
        console.log("cords",left, top, width, height)

        const x = (e.ClientX - left) / width
        const y = (e.ClientY - top) / height

        setZoomy({
            x,
            y
        })
    },[zoomy])

    const handleZoomOut = () => {
        setZoomImg(false)
    }


  return (
        <div className='product-display'>
            <div className='display-left'>
                <div className='img-list'>
                    <img src={`/images/${product.image}`} alt="" />
                    <img src={`/images/${product.image}`} alt="" />
                    <img src={`/images/${product.image}`} alt="" />
                    <img src={`/images/${product.image}`} alt="" />
                </div>
                <div className='display-img'>
                  <img className='main-img' src={`/images/${product.image}`} alt="" onMouseMove={handleZoom} onMouseLeave={handleZoomOut}/>
                  {
                    zoomImg && (
                      <div className='display-img1'>
                        <div className='img22' style={{backgroundImage: `url(${`/images/${product.image}`})`, backgroundRepeat: 'no-repeat', backgroundPosition:`${zoomy.x * 100}% ${zoomy.y * 100}%`}}></div>
                      </div>  
                    )
                  }
                  
                </div>
                
            </div>
            <div className='display-right'>
                <h1>{product.product_name}</h1>
                <p style={{fontWeight: '400'}}>{product.brand_name}</p>
                <div className='rating'>
                    <FaStar className='star'/>
                    <FaStar className='star'/>
                    <FaStar className='star'/>
                    <FaStar className='star'/>
                    <FaStarHalfStroke className='star'/>
                    <b> (122)</b>
                </div>
                <div className='prices'>
                    <div className='oldprice'>${product.old_price?.toLocaleString()}</div>
                    <div className='newprice'>${product.new_price?.toLocaleString()}</div>
                </div>
                <div>
                    <button onClick={()=> {addToCart(product._id); toast.success('Added to cart')} }>ADD TO CART</button>
                </div>
            </div>
        </div>
  )
}

export default ProductDisplay