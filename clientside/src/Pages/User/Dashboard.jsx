import React from 'react'
import Layout from '../../Components/Layout'
import { RiTodoLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Layout title={'SHOPLAKE- User Dashboard'}>
       <div className='firstdiv'>
        <div className='Sidebar'>
         <aside className='sidebar-options' >
           <Link to={'profile'} style={{ textDecoration: 'none ', color: 'inherit'}} className='sideoption'>
                <div className='sideimg1'>
                <CgProfile />
                </div>
                <Link to={'profile'} style={{ textDecoration: 'none ', color: 'inherit'}}><p>Profile</p></Link> 
           </Link>
            <Link to={'orders'} style={{ textDecoration: 'none ', color: 'inherit'}} className='sideoption'>
                <div className='sideimg1'>
                <RiTodoLine />
                </div>
                <Link to={'orders'} style={{ textDecoration: 'none ', color: 'inherit'}}><p>Orders</p></Link>
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

export default Dashboard