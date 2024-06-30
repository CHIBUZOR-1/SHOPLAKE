import { Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import EditProductsPrice from '../../Components/EditProducts/EditProductsPrice';
import prodList from '../../helpers/helper';
import './AllProducts.css'
import Loader from '../../Components/Loader'


const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [Visible, setVisible] = useState(false);
  const [nowOld, setNowOld] = useState("");
  const [nowNew, setNowNew] = useState("");
  const [loading, setloading] = useState(false);
  const [newQuantity, setNewQuantity] = useState("")
  const [newSub_category, setNewSubCategory] = useState()
  const [product, setProduct] = useState(null)
  const getProducts = async () => {
    setloading(true)
    const response = await prodList();
    if(response.success) {
      setAllProducts(response.data)
      setloading(false)
      toast.success(response.message);
    } else {
      toast.error('Error');
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateProduct = await axios.put(`/api/product/update_product/${product._id}`, { nowOld, nowNew, newQuantity, newSub_category});
    if(updateProduct.data.success) {
      toast.success(updateProduct.data.message)
      setProduct(null)
      setNowOld("")
      setNowNew("")
      setNewQuantity("")
      setVisible(false)
      getProducts()
    } else {
      toast.error(updateProduct.data.message)
    }
  }
  const deleteProduct = async (id) => {
    const resp = await axios.delete(`/api/product/remove_product/${id}`);
    await getProducts();
    if(resp.data.success) {
      toast.success(resp.data.message);
      console.log(id, resp.data.product);
    } else if (!resp.data.success) {
      toast.error(resp.data.message);
      console.log(id);
    } else {
      toast.error(resp.data.message);
    }
  }

  return (
    <div className='all-prods'>
      {
        loading? <div className='ld'><Loader /></div> : <>
        <h1>All Products</h1>
      <div className='list-type'>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand Name</th>
              <th>Old Price</th>
              <th>New Price</th>
              <th>Category</th>
              <th>Sub_category</th>
              <th>Quantity</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            
          </thead>
          <tbody>
            {allProducts.map((p, i) => {
              return (
                <tr key={i + 1}>
                  <td><img src={`/images/${p.image}`} alt="" /></td>
                  <td>{p.product_name}</td>
                  <td>{p.brand_name}</td>
                  <td>${p.old_price.toLocaleString()}</td>
                  <td>${p.new_price.toLocaleString()}</td>
                  <td>{p.category}</td>
                  <td>{p.sub_category}</td>
                  <td>{p.quantity}</td>
                  <td><button onClick={()=> {setVisible(true); setNowOld(p.old_price); setNowNew(p.new_price); setNewQuantity(p.quantity); setNewSubCategory(p.sub_category); setProduct(p)}}>EDIT</button></td>
                  <td><button onClick={()=>deleteProduct(p._id)}>X</button></td>
                </tr>
              )
            })}
          </tbody>
            
        </table>
      </div>
      <Modal title='Update Product Price' open={Visible} footer={null} onCancel={()=> setVisible(false)}>
        <EditProductsPrice handleUpdate={handleSubmit} value1={nowOld} value2={nowNew} value3={newQuantity} value4={newSub_category} setValue={setNowOld} setValue1={setNowNew} setValue2={setNewQuantity} setValue3={setNewSubCategory}/>
      </Modal>
      </>
        
      }
    </div>
  )
}

export default AllProducts