import React from 'react'
import Layout from '../../Components/Layout'
import { IoAddCircleOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { FaUsers } from "react-icons/fa6";
import { RiTodoLine } from "react-icons/ri";
import { Link, Outlet } from 'react-router-dom';


const AdminDashboard = () => {
  return (
    <Layout>
      <div className='firstdiv'>
        <div className='Sidebar'>
         <aside className='sidebar-options'>
           <Link to={'create-product'} style={{ textDecoration: 'none ', color: 'inherit'}} className='sideoption'>
              
                <div className='sideimg1'>
                  <IoAddCircleOutline />
                </div>
                <p><Link to={'create-product'} style={{ textDecoration: 'none ', color: 'inherit'}}>Add Products</Link></p>
              
           </Link>
            <Link to={'all-products'} style={{ textDecoration: 'none ', color: 'inherit'}} className='sideoption'>
                <div className='sideimg1'>
                <GoChecklist />
                </div>
                <p><Link to={'all-products'} style={{ textDecoration: 'none ', color: 'inherit'}}>All Products</Link></p>
            </Link>
            <Link to={'all-users'} style={{ textDecoration: 'none ', color: 'inherit'}} className='sideoption'>
                <div className='sideimg1'>
                <FaUsers />
                </div>
                <p><Link to={'all-users'} style={{ textDecoration: 'none ', color: 'inherit'}}>All Users</Link></p>
            </Link>
            <Link to={'all-orders'} style={{ textDecoration: 'none ', color: 'inherit'}} className='sideoption'>
                <div className='sideimg1'>
                <RiTodoLine />
                </div>
                <p><Link to={'all-orders'} style={{ textDecoration: 'none ', color: 'inherit'}}>Orders</Link></p>
            </Link>

         </aside>
         
        </div>
        <main>
          <Outlet/>
        </main> 
      </div>
       
    </Layout>
    
  )
}

export default AdminDashboard