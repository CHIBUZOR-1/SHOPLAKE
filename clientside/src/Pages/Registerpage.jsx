import React, { useState } from 'react'
import Layout from '../Components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
const Registerpage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        lastname: "",
        phoneNumber: "",
        email: "",
        answer: "",
        password: "",
        confirmPassword: ""
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
        if(data.confirmPassword === data.password) {
            const response =await axios.post('/api/user/register', data);
            if(response.data.success) {
                toast.success(response.data.message);
                navigate('/Login');   
            }
            console.log('response', response.data);
            console.log('data',data);

            if(!response.data.success) {
                toast.error(response.data.message);
            }
            
     } else {
        toast.error("Pasword Mismatch!");
     }
    }


  return (
    <Layout title={'SHOPLAKE Register'}>
      <div className='Register'>
            <div className='Registration-container'>
                <h1>Register</h1>
                <form className='signUp-fields' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>
                            <strong>First Name</strong>
                        </label>
                        <br />
                        <input name='name' value={data.name} type='text' placeholder='input firstname' id='name' onChange={handleChange} required/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor='lastname'>
                            <strong>Last Name</strong>
                        </label>
                        <br />
                        <input name='lastname' value={data.lastname} type='text' placeholder='input Lastname' id='lastname' onChange={handleChange} required/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor='PhoneNumber'>
                            <strong>Phone</strong>
                        </label>
                        <br />
                        <input name='phoneNumber' value={data.phoneNumber} type='text' placeholder='input Phone number'id='phoneNumber' onChange={handleChange} required/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <br />
                        <input name='email' value={data.email} type='email' placeholder='input Email' id='email' onChange={handleChange} required/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor='answer'>
                            <strong>Whats Your Favourite Word</strong>
                        </label>
                        <br />
                        <input name='answer' value={data.answer} type='text' placeholder='input Answer' id='answer' onChange={handleChange} required/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <br />
                        <input name='password' value={data.password} type='password' placeholder='Input Password' id='password' onChange={handleChange} required/>
                        <div>
                        </div>
                    </div>
                    <br />
                    <div>
                        <label htmlFor='Confirm password'>
                            <strong>Confirm password</strong>
                        </label>
                        <br />
                        <input name='confirmPassword' value={data.confirmPassword} type='password' placeholder='Confirm password' id='Confirm password' onChange={handleChange} required/>
                        <div>

                        </div>
                    </div> 
                    <br />
                    <div>
                        <button type='submit'>Register</button>
                    </div>
                    <br />
                    <div>
                        <p>Already Have an account? <span><Link to='/Login' style={{ textDecoration: 'none'}}>Login</Link></span></p>
                    </div>
                </form>
                
            </div>

       </div>
    </Layout>
  )
}

export default Registerpage;