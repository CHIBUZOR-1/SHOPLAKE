import React, {useState} from 'react'
import { BiSearchAlt } from "react-icons/bi";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { usePass } from '../Context/lakeContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSearch } from '../Context/searchContext';
import { FiUserCheck } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";



const Header = () => {
  const navigate = useNavigate();
  const {pass, setPass, getTotalCartItems } = usePass();
  const {search, setSearch} = useSearch();
  const [open, setOpen] = useState(false);
  const handleSubmit = async(e)=> {
    e.preventDefault()
    const res = await axios.get(`/api/product/search/${search.phrase}`);
    if(res.data.success){
      setSearch({...search, result: res.data.data});
      console.log(search);
      navigate(`/search?q=${search.phrase}`);
    }
  }

  const handleOpen = () => {
    setOpen(!open);
  }
  const logout = () => {
    localStorage.removeItem("pass");
    setPass({
      ...pass,
      user: null,
      token: ""
    });
    toast.success("Logout Successfully");
  }
  return (
    <div className='navbar'>
        <div className='logo'>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit'}}>
            <h2>SHOPLAKE</h2>
          </Link>
        </div>
        <form className='fieldbox' onSubmit={handleSubmit}>
          <input type='text' value={search.phrase} placeholder='search lake...' onChange={(e)=> setSearch({...search, phrase: e.target.value})} className='searchbox'/>
          <button type='submit' className='searchbttn'><BiSearchAlt /></button>
        </form>
        <div className='nav-menu'>
            <li><Link style={{ textDecoration: 'none', color: 'inherit'}} to='/'>HOME</Link></li>
            <Link to={'/About'} style={{ textDecoration: 'none', color: 'inherit'}}><li>ABOUT</li></Link>
        </div>
        {!pass.token ? 
        <div className='log'>
           <Link className='login' style={{ textDecoration: 'none', color: 'inherit'}} to='/Login'><button>LOGIN</button></Link>
        </div> :
        <div className='dome'>
          <div className='header-profile'>
            <div onClick={handleOpen} className='login-p'><div><FiUserCheck /></div>{pass?.user?.name}<span className='lr'><IoIosArrowDown /></span></div>
            {open ? 
            <ul className='header-profile-dropdown'>
              <Link style={{ textDecoration: 'none', color: 'inherit'}} to={`/dashboard/${pass.user.role === "ADMIN" ? "admin" : "user"}`}><li>Dashboard</li></Link>
              <hr />
              <li className="log-icon" onClick={()=>{logout(); navigate(0)}}><Link style={{ textDecoration: 'none', color: 'inherit'}} to='/'>&#8594;LOGOUT</Link></li>
            </ul> : null
            }
            
         </div>
        </div>
        
        }
        
        
        <div className='cart'>
          <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit'}}><PiShoppingCartSimpleDuotone /></Link>
          <p>{getTotalCartItems()}</p>
        </div>
    </div>
  )
}

export default Header