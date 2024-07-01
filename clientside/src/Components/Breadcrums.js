import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrums = ({product}) => {
  return (
    <div className='crum'>
      <Link style={{ textDecoration: 'none', color: 'inherit'}} to='/'>HOME</Link> &gt; {product.category} &gt; {product.sub_category} &gt; {product.brand_name}
    </div>
  )
}

export default Breadcrums