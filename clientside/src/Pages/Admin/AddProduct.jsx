import React, { useState } from 'react'
import './Add.css';
import { assets } from '../../Components/Assets/Assets'
import axios from 'axios';
import { toast } from 'react-toastify';
const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    product_name: "",
    brand_name: "Samsung",
    description: "",
    old_price: "",
    new_price: "",
    category: "Appliances",
    sub_category: "Smartphones",
    quantity: ""
  });

  const handleChange = ({target}) => {
    const {name, value} = target;
    setData((preve) => ({
        ...preve,
        [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_name', data.product_name);
    formData.append('brand_name', data.brand_name);
    formData.append('description', data.description);
    formData.append('old_price', data.old_price);
    formData.append('new_price', data.new_price);
    formData.append('image', image);
    formData.append('category', data.category);
    formData.append('sub_category', data.sub_category);
    formData.append('quantity', data.quantity);
    const formFill = await axios.post('/api/product/add_product', formData);
    if(formFill.data.success) {
        toast.success(formFill.data.message);
        setData({
          product_name: "",
          brand_name: "Samsung",
          description: "",
          old_price: "",
          new_price: "",
          image: "",
          category: "Appliances",
          sub_category: "Smartphones",
          quantity: ""
        })
        setImage(false)
      } else {
        toast.error(formFill.data.message)
      }

  }
  return (
    <div className='add-product' enctype="multipart/form-data" >
      <form className='addproduct-form' onSubmit={handleSubmit}>
        <div className='prod_items'>
          <p>Product Name</p>
          <input name='product_name' value={data.product_name} type="text"  placeholder='enter product name' onChange={handleChange} required/>
        </div>
        <div className='prod-price'>
          <div className='prod_items'>
            <p>Old price</p>
            <input type="number" value={data.old_price} name='old_price'  placeholder='enter product old price' onChange={handleChange} required/>
          </div>
          <div className='prod_items'>
            <p>New price</p>
            <input type="number" value={data.new_price}  name='new_price' placeholder='enter product new price' onChange={handleChange} required/>
          </div>
          <div className='prod_items'>
            <p>Quantity</p>
            <input type="number" value={data.quantity}  name='quantity' placeholder='enter quantity' onChange={handleChange} required/>
          </div>
        </div>
        <div className='prod-price'>
          <div className='prod_items'>
            <p>Select Brand</p>
            <select value={data.brand_name} name='brand_name' className='prod_selector' onChange={handleChange} >
              <option value="Samsung">Samsung</option>
              <option value="Apple">Apple</option>
              <option value="XIAOMI Redmi">XIAOMI Redmi</option>
              <option value="Nokia">Nokia</option>
              <option value="Vivo">Vivo</option>
              <option value="Huawei">Huawei</option>
              <option value="Infinix">Infinix</option>
              <option value="Tecno">Tecno</option>
              <option value="Lenovo">Lenovo</option>
              <option value="Asus">Asus</option>
              <option value="HP">HP</option>
              <option value="Dell">Dell</option>
              <option value="itel">itel</option>
              <option value="Hisense">Hisense</option>
              <option value="LG">LG</option>
              <option value="Sony">Sony</option>
              <option value="Sumec Firman">Sumec Firman</option>
              <option value="Maxi">Maxi</option>
              <option value="Haier">Haier</option>
            </select>
          </div>
          <div className='prod_items'>
          <p>Select Category</p>
            <select value={data.category} name='category'  onChange={handleChange} className='prod_selector'>
              <option value="Appliances">Appliances</option>
              <option value="Electronics">Electronics</option>
              <option value="Phones And Tablets">Phones And Tablets</option>
              <option value="Computing">Computing</option>
            </select>
          </div>
          <div className='prod_items'>
            <p>Select Subcategory</p>
            <select value={data.sub_category}  name='sub_category' className='prod_selector' onChange={handleChange}>
              <option value="Smartphones">Smartphones</option>
              <option value="Tablets">Tablets</option>
              <option value="Mobile Accessories">Accessories</option>
              <option value="Laptops">Laptops</option>
              <option value="Televisions">Televisions</option>
              <option value="Generators">Generators</option>
              <option value="Refrigerators">Refrigerators</option>
              <option value="Laundry">Laundry</option>
              <option value="Earbuds">Earbuds</option>
              <option value="Headphones">Headphones</option>
              <option value="Air Conditioners">Air Conditioners</option>
            </select>
          </div>
        </div>
        
        <div className='prod_items'>
          <p>Description</p>
          <textarea onChange={handleChange} value={data.description} name="description"  rows="10" cols="16" required></textarea>
        </div>
        <div className='prod_items'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img className='prod-thumbnail' src={image? URL.createObjectURL(image):assets.image_icon} alt="" />
          </label>
          <input name='image' onChange={(e) => setImage(e.target.files[0])} type="file"  id="image" hidden required/>
        </div>
        <br />
        <button className='prod-btn' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddProduct