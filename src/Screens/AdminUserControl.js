import React from 'react'
import AdminNav from '../components/AdminNav'
import SlideBar from '../components/SlideBar'
import AdminUserView from './AdminUserView'
function AdminUserControl() {
  return (
    <>
       <div className='content-wrapper' style={{height:"94vh" ,marginTop:"-88px" }}>
            
            <div    className='main-content' style={{backgroundColor:"rgb(251, 255, 255)"}}>
                <AdminNav/>
                        <div  style={{ display: 'flex', height: '100vh', overflow: 'scroll initial'}}>
                  
                  <SlideBar/>
                  <AdminUserView/>
                  </div>
            </div></div>
    </>
  )
}

export default AdminUserControl
