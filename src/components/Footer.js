import React from "react";
import { useLocation } from "react-router-dom";
function Footer() {
  const location = useLocation();
  return (
    <footer>
      {!location.pathname.includes('admin') && (<div className="container">
        <div className="row">
          <div className="col-md-4 footer-column">
            <ul className="nav flex-column">
              <li className="nav-item">
                <span className="footer-title">PROJECT</span>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  E-COMMERCE
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  PROJECT B
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  LTSBANK
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 footer-column">
            <ul className="nav flex-column">
              <li className="nav-item">
                <span className="footer-title">PROJMEMBER_GROUP5</span>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  LMD
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  NBT
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
                  NVS
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 footer-column">
            <ul className="nav flex-column">
              <li className="nav-item">
                <span className="footer-title">CONTACT</span>
              </li>
              <li className="nav-item">
                <a href="https://www.facebook.com/people/EC-P105-EMarketing/100075051271344/">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li className="nav-item">
                <a href="https://github.com/son17112001/EC-fontend">
                  <i className="fab fa-github" />
                </a>
              </li>
              <li className="nav-item">
                <a href="https://github.com/tran4774/card-management-system">
                  <i className="fab fa-github" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <span className="copyright quick-links">
            Copyright © LTSBANK
          </span>
        </div>
      </div>)}
    </footer>
  )
}

export default Footer;
