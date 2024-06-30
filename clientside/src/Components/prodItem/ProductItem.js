import React from 'react'
import './ProductItem.css'
const ProductItem = (props) => {
  return (
    <div onClick={()=>window.scrollTo(0,0)} className='prod'>
      <div className='prodimgc'>
        <img src={props.image} alt=''/>
      </div>
      <div>
        <p>{props.name}</p>
      </div>
      <div className='prix'>
        <div className='nprix'> 
          ${props.new_price}
        </div>
        <div className='oprix'>
          ${props.old_price}
        </div>    
      </div>    
    </div>
  )
}

export default ProductItem