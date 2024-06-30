import React, { useEffect, useState } from 'react'
import { usePass } from '../../Context/lakeContext';
import axios from 'axios';
import { BsBoxSeamFill } from "react-icons/bs";
import './Orderz.css'

const Orderz = () => {
  const [data, setData] = useState([]);
  const {pass} = usePass();

  const getOrders= async() => {
    const {data} = await axios.post('/api/order/user_orders',{});
    setData(data.data);
    console.log(data.data);

  }

  useEffect(()=>{
    if(pass.token) {
      getOrders();
    }
  }, [pass.token])

  return (
    <div className='ord'>
      <h2>My Orders</h2>
      <div className='container'>
        {
          data.map((o, i)=>{
            return(
              /*<div key={i} className='eor'>
                <div className='img'><BsBoxSeamFill /></div>
                <p>{o.products.map((p, i)=> {
                  if(i === o.products.length-1) {
                    return p.product_name + " x " + p.quantity
                  } else {
                    return p.product_name + " x " + p.quantity + " , "
                  }
                })}</p>
                <p>{o.amount}</p>
                <p>{o.products.length}</p>
                <p><span>&#x25cf;</span> <b>{o.status}</b></p>
                <button>Track Order</button>
              </div>*/
              <table key={i}>
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Orders</td>
                    <td>Products</td>
                    <td>Amount</td>
                    <td>Quantity</td>
                    <td>Payment</td>
                    <td>Status</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>{i + 1}</b></td>
                    <td><div className='img'><BsBoxSeamFill /></div></td>
                    <td>{o.products.map((p, i)=> {
                      if(i === o.products.length-1) {
                        return p.product_name + " x " + p.quantity
                      } else {
                        return p.product_name + " x " + p.quantity + " , "
                      }
                    })}</td>
                    <td>{o.amount}</td>
                    <td>{o.products.length}</td>
                    <td><p><span>&#x25cf;</span>{o.payment.success? "Success":"failed"}</p></td>
                    <td><p><span>&#x25cf;</span> <b>{o.status}</b></p></td>
                    <td><button onClick={getOrders}>Track Order</button></td>
                  </tr>
                </tbody>
              </table>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orderz