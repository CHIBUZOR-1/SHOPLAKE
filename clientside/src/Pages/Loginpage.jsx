import React, { useState } from 'react'
import Layout from '../Components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { usePass } from '../Context/lakeContext'
import axios from 'axios';

const Loginpage = () => {
    const navigate = useNavigate();
    const {pass, setPass} = usePass();
    
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    
    const handleChange = ({target}) => {
        const {name, value} = target;
        setData((preve) => ({
            ...preve,
            [name]: value
        }));
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/user/login', data);
        if(response.data.success) {
            toast.success(response.data.message);
            navigate('/');
            navigate(0)
            setPass({
                ...pass,
                user: response.data.user,
                token: response.data.token
            });
            localStorage.setItem("pass", JSON.stringify(response.data));
        }

        if(!response.data.success) {
            toast.error(response.data.message);
        }


    }
  return (
    <Layout title={'SHOPLAKE Login'}>
        <div className='logins'>
            <div className='login-container'>
                <h2>LOGIN</h2>
                <form className='Sign-form' onSubmit={handleSubmit}>
                    <div className='ms'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <br />
                        <input name='email' value={data.email} type='email' placeholder='input Email'id='email' onChange={handleChange} />
                    </div>
                    <br />
                    <div className='ms'>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <br />
                        <input name='password' value={data.password}type='password' placeholder='input Password'id='password' onChange={handleChange} />
                    </div>
                    <div className='forgot'>
                        <Link to={'/Reset Password'}><p>Forgot Password?</p></Link>
                    </div>
                    <div>
                        <button type='submit'>Login</button>
                    </div>
                    <div>
                        <p>Don't have an account? <span><Link to='/Register' style={{ textDecoration: 'none '}}>Register</Link></span></p>
                    </div>
                </form>
                
            </div>

       </div>
    </Layout>
    
  )
}

export default Loginpage