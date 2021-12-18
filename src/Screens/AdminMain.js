import React from 'react'
import AdminLogin from '../components/AdminLogin'
import SlideBar from '../components/SlideBar'
function AdminMain() {
    return (
        <>
         <div  style={{ display: 'flex', height: '100vh', overflow: 'scroll initial'}}>
            <SlideBar/>
            <AdminLogin/>
            </div>
    
        </>
    )
}

export default AdminMain
