import React, { useEffect, useState } from 'react'
import './CategoryList.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(()=> {
    getCategories()
  }, [])

  const getCategories = async() => {
    const res = await axios.get('/api/product/product_categories');
    if(res.data.success) {
      setCategories(res.data.data);
    }
  }
  return (
    <div className='cat_list'>
      <div className='cat_contain'>
        {
          categories.map((cat, i) => {
            return(
              <Link to={`/product_category/${cat.sub_category}`} style={{ textDecoration: 'none', color: 'inherit'}} key={i} className='rcover'>
                <div className='cat_img'>
                  <img src={`/images/${cat.image}`} alt='' className='cat_imgdome'/>
                </div>
                <p className='catp'>{cat.sub_category}</p>
              </Link>
            )
          })
        }
      </div>
      
    </div>
  )
}

export default CategoryList