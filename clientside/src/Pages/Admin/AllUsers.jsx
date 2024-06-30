import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdEdit } from "react-icons/md";
import moment from 'moment'
import { Modal } from 'antd'
import EditUser from "../../Components/EditUserRoles/EditUser";
import './AllUsers.css'


const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([])
  const [Visible, setVisible] = useState(false)
  const [newAdmin, setNewAdmin] = useState("")
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUsers()
  }, [])

  // for update form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateRole = await axios.put(`/api/user/update_role/${user._id}`, { newAdmin });
    if(updateRole.data.success) {
      toast.success(updateRole.data.message)
      console.log(user, newAdmin)
      setUser(null)
      setNewAdmin("")
      setVisible(false)
      getUsers()
    } else if(!updateRole.data.success) {
      toast.error(updateRole.data.message)
    } else {
      toast.error("Something Happened")
    }

  }

  const getUsers = async () => {
    const response = await axios.get('/api/user/all_users');
    if(response.data.success) {
      setAllUsers(response.data.data)
      toast.success(response.data.message);
    } else {
      toast.error('Error');
    }
  }

  

  return (
    <div className='allu'>
      <h1 className='epp'>All Users</h1>
      <table className='table1'>

        <thead className="table-format title">
          <tr className='table-format'>
            <th>Sr</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((item, index) => {
          return (
             <tr key={index} className='table-format'>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.admin}</td>
                <td>{moment(item.createdAt).format('ll')}</td>
                <td className='edit'><button onClick={() => {setVisible(true); setNewAdmin(item.admin); setUser(item)}}><MdEdit /></button></td>
             </tr>
            )
          })}
        </tbody>
      </table>
      <Modal title='Update User Role' onCancel={()=> setVisible(false)} open={Visible} footer={null}>
        <EditUser handleUpdate={handleSubmit} value={newAdmin} setValue={setNewAdmin} />
      </Modal>
    </div>
  )
}

export default AllUsers