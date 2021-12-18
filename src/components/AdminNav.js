import React,{useEffect,useState} from "react";
import {Dropdown} from "react-bootstrap"
import {logout} from  "../actions/adminAuthAction"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
function AdminNav() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const adminLogin= useSelector(state =>state.adminLogin)
  const [admin,setAdmin]=useState()
  const {adminInfo}= adminLogin;
  useEffect(()=>{
    if(adminInfo){
      setAdmin(adminInfo.name)
    }
    
  },[adminInfo])
  function logoutHandler(){
    dispatch(logout())
    navigate('/admin')
  }
  function profileHandler(){
    navigate('/admin/profile')
  }
  return (
    
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark admin-page" style={{ backgroundColor: 'blue'}} >
  {/* Container wrapper */}
  <div className="container-fluid">
    {/* Toggle button */}
    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i className="fas fa-bars" />
    </button>
    {/* Collapsible wrapper */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {/* Navbar brand */}
      <a className="navbar-brand mt-2 mt-lg-0" href="/">
        <img src="/logo.png" height={40 } alt="LTS Logo" loading="lazy" />
      </a>
      
    </div>
    {/* Collapsible wrapper */}
    {/* Right elements */}
    <div className="d-flex align-items-center">
{/*       
      <a className="text-reset me-3" href="#">
        <i className="fas fa-shopping-cart" />
      </a>
    
      <a className="text-reset me-3 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
        <i className="fas fa-bell" />
        <span className="badge rounded-pill badge-notification bg-danger">1</span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
        <li>
          <a className="dropdown-item" href="#">Some news</a>
        </li>
        <li>
          <a className="dropdown-item" href="#">Another news</a>
        </li>
        <li>
          <a className="dropdown-item" href="#">Something else here</a>
        </li>
      </ul> */}
    
      {/* <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
        <img src="https://mdbootstrap.com/img/new/avatars/2.jpg" className="rounded-circle" height={25} alt="Black and White Portrait of a Man" loading="lazy" />
      </a> */}
      {admin && (<Dropdown>
  <Dropdown.Toggle variant="primary" id="dropdown-basic">
   Admin
  </Dropdown.Toggle>

  <Dropdown.Menu>
   
    <Dropdown.Item onClick={profileHandler}>Profile</Dropdown.Item>
    <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>)}
      
    </div>
    {/* Right elements */}
  </div>
  {/* Container wrapper */}
</nav>


  );
}

export default AdminNav
