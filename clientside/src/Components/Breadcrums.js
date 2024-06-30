import React from 'react'

const Breadcrums = ({product}) => {
  return (
    <div className='crum'>
      HOME &gt; {product.category} &gt; {product.sub_category} &gt; {product.brand_name}
    </div>
  )
}

export default Breadcrums