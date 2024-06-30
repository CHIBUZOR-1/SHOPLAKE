import React, { useRef, useState } from 'react'
import './Card1.css'
import axios from 'axios';
import { useEffect } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import ProductItem from '../prodItem/ProductItem';
import { Link } from 'react-router-dom';
const Card1 = ({gt_category, heading}) => {
    const [data, setData] = useState([]);

    const scrollElement = useRef();

    useEffect(()=> {
        getBySubCategory()
        // eslint-disable-next-line
    }, [])

    const scrollRight = ()=> {
        scrollElement.current.scrollLeft += 400;
    }
    const scrollLeft = ()=> {
        scrollElement.current.scrollLeft -= 400;
    }

    const getBySubCategory = async() => {
        const resp = await axios.post('/api/product/card_category', { gt_category });

        if(resp.data.success) {
            setData(resp.data.data);
        }
    }
  return (
    <div className='card_top'>
        <p className='card_ps'>{heading}</p>
        <div className='sublayer'>
            <div className='incard' ref={scrollElement}>
                    <button className='btx'onClick={scrollLeft}>
                        <FaAngleLeft />
                    </button>
                    <button className='bty' onClick={scrollRight}>
                        <FaAngleRight />
                    </button> 
                
                {
                    data.map((prod, i)=> {
                        return(
                            <Link key={i} to={`/product/${prod._id}`} style={{ textDecoration: 'none', color: 'inherit'}} >
                              <ProductItem  id={prod._id} name={prod.product_name} image={`/images/${prod.image}`} new_price={prod.new_price.toLocaleString()} old_price={prod.old_price.toLocaleString()} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Card1