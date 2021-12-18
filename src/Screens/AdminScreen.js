import React from 'react'
import AdminNav from '../components/AdminNav'
import AdminMain from './AdminMain'
function AdminScreen() { 
    return (
        <>
            <div className='content-wrapper' style={{height:"94vh" ,marginTop:"-88px" }}>
            
            <div    className='main-content' style={{backgroundColor:"rgb(251, 255, 255)"}}>
                <AdminNav/>
                <AdminMain/>
            </div></div>
        </>
    )
}

export default AdminScreen
