import React, { useEffect } from 'react'
import './styles.css'
import User from "../../assests/user.svg"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Header() {
  const token=sessionStorage.getItem('authToken');
  const navigate=useNavigate()
  const Logout=()=>{
    sessionStorage.clear();
    toast.success("Successfully Logout !")
    navigate("/")
  }
  return (
    <div className='navbar'>
      <p className='logo'>KanbanBug</p>
      
      {token&&<div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <img src={User} style={{ borderRadius: "50%", height: "2rem", width: "2rem" }} />
        <p className='logo link' onClick={Logout}>Logout</p>
        </div>}
    </div>
  )
}

export default Header