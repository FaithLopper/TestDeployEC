import React from 'react'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from 'react-router-dom';
function SlideBar() {
    return (
      
      <CDBSidebar textColor="#fff" backgroundColor="#101A33">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/admin/control/card/view" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="far fa-credit-card">Card</CDBSidebarMenuItem>

            </NavLink>
            
            <NavLink exact to="/admin/control/user" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">User management</CDBSidebarMenuItem>
            </NavLink>  
            <NavLink exact to="/admin/control/order" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Order</CDBSidebarMenuItem>
              
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/hero404"
              target="_blank"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>

    )
      
        
}

export default SlideBar
