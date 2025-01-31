/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Scrollbars from "react-custom-scrollbars-2";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from '../firebase/authService';
import { blog, doctor, doctorschedule, logout, menuicon06, menuicon10, menuicon11, menuicon12, menuicon15, menuicon16, patients, sidemenu } from './imagepath';
const Sidebar = (props) => {
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState("");
  const handleClick = (e, item, item1, item3) => {
    const div = document.querySelector(`#${item}`);
    const ulDiv = document.querySelector(`.${item1}`);
    e?.target?.className ? ulDiv.style.display = 'none' : ulDiv.style.display = 'block'
    e?.target?.className ? div.classList.remove('subdrop') : div.classList.add('subdrop');
  }

  useEffect(() => {
    if (props?.id && props?.id1) {
      const ele = document.getElementById(`${props?.id}`);
      handleClick(ele, props?.id, props?.id1);
    }
  }, [])

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu"
              onMouseLeave={expandMenu}
              onMouseOver={expandMenuOpen}
            >
              <ul>
                {/* <li className="submenu" >
                  <Link to="#" id="menu-item" onClick={(e) => {

                    handleClick(e, "menu-item", "menu-items")
                  }}>
                    <span className="menu-side">
                      <img src={dashboard} alt="" />
                    </span>{" "}
                    <span> Dashboard </span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: sidebar === 'Dashboard' ? 'block' : "none" }} className='menu-items'>
                    <li>
                      <Link className={props?.activeClassName === 'admin-dashboard' ? 'active' : ''} to="/admin-dashboard">Admin Dashboard</Link>
                    </li>
                  </ul>
                </li> */}
                
                {/* Hero Section */}
                <li className="submenu">
                  <Link
                    to="#"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={blog} alt="" /> 
                    </span>{" "}
                    <span>Hero Section</span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="menu-items4">
                    {/* <li>
                      <Link
                        className={
                          props?.activeClassName === "heroSection"
                            ? "active"
                            : ""
                        }
                        to="/landingpage/herosection"
                      >
                        Navbar
                      </Link>
                    </li> */}

                    {/* Carousels */}
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "childEmergency"
                            ? "active"
                            : ""
                        }
                        to="/herocarousel"
                      >
                        Carousels
                      </Link>
                    </li>

                    {/* Information Cards */}
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "courseContent"
                            ? "active"
                            : ""
                        }
                        to="/informationcard"
                      >
                      Information Cards
                      </Link>
                    </li>
                  </ul>
                </li>
                 {/* Schedule  */}

                <li className="submenu">
                  <Link
                    to="/scheduleheader"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={doctorschedule} alt="" />
                    </span>{" "}
                    <span>Business details</span> 
                  </Link>
                </li>
                


                
                {/* About Us */}

                <li className="submenu">
                  <Link
                    to="/aboutlist"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={menuicon15} alt="" />
                    </span>{" "}
                    <span>About Us</span> 
                  </Link>
                </li>
               {/* Services */}

              <li className="submenu">
                  <Link
                    to="/serviceheader"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={menuicon16} alt="" />
                    </span>{" "}
                    <span>Services</span> 
                  </Link>
                </li>
                 {/* Team */}

              <li className="submenu">
                  <Link
                    to="/teamheader"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={patients} alt="" />
                    </span>{" "}
                    <span>Team</span> 
                  </Link>
                </li>

                {/* Form  */}
                <li className="submenu">
                  <Link
                    to="/formheader"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={blog} alt="" />
                    </span>{" "}
                    <span>Form</span> 
                  </Link>
                </li>

                {/* Hospital Kontakte */}

              <li className="submenu">
                  <Link
                    to="/hospitalkontakteheader"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={doctor} alt="" />
                    </span>{" "}
                    <span>Hospital Kontakte</span> 
                  </Link>
                </li>

                 {/* Links */}
              
               <li className="submenu">
                  <Link
                    to="/linkheader"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={sidemenu} alt="" />
                    </span>{" "}
                    <span>Links</span> 
                  </Link>
                </li>

                {/* Gallery  */}

                <li className="submenu">
                  <Link to="#" id="menu-item13" onClick={(e) => handleClick(e, "menu-item13", "menu-items13")}>
                    <span className="menu-side">
                      <img src={blog} alt="" />
                    </span>{" "}
                    <span> Gallery</span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="menu-items13">
                    
                    <li>
                      <Link className={props?.activeClassName === 'galleryheader' ? 'active' : ''} to="/galleryheader">
                        Gallery View
                      </Link>
                    </li>
                    <li>
                      <Link className={props?.activeClassName === 'categories' ? 'active' : ''} to="/categories">Edit Categories</Link>
                    </li>
                    
                  </ul>
                </li>

                {/* Blog */}

              <li className="submenu">
                  <Link to="#" id="menu-item11" onClick={(e) => handleClick(e, "menu-item11", "menu-items11")}>
                    <span className="menu-side">
                      <img src={blog} alt="" />
                    </span>{" "}
                    <span> News</span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="menu-items11">
                    
                    <li>
                      <Link className={props?.activeClassName === 'blog-details' ? 'active' : ''} to="/blogview">
                        News View
                      </Link>
                    </li>
                    <li>
                      <Link className={props?.activeClassName === 'add-blog' ? 'active' : ''} to="/blogview/addblog">Add News</Link>
                    </li>
                    
                  </ul>
                </li>


                {/* Representation */}
                <li className="submenu">
                  <Link
                    to="#"
                    id="representation"
                    onClick={(e) => handleClick(e, "representation", "representations")}
                  >
                    <span className="menu-side">
                      <img src={menuicon06} alt="" />
                    </span>{" "}
                    <span>Representation</span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: "none" }} className="representations">
                 
                    {/* Weekly Representation */}
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "weeklyrepresentationheader"
                            ? "active"
                            : ""
                        }
                        to="/weeklyrepresentationheader"
                      >
                        Weekly Representation
                      </Link>
                    </li>

                    {/* Monthly Representation */}
                    <li>
                      <Link
                        className={
                          props?.activeClassName === "courseContent"
                            ? "active"
                            : ""
                        }
                        to="/representationdates"
                      >
                      Monthly Representation
                      </Link>
                    </li>
                  </ul>
                </li>


                {/* Important information  */}

                <li className="submenu">
                  <Link
                    to="/importantinformationheader"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={menuicon12} alt="" />
                    </span>{" "}
                    <span>Important Info</span> 
                  </Link>
                </li>

                {/* Important information  */}

                <li className="submenu">
                  <Link
                    to="/sociallinks"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={menuicon11} alt="" />
                    </span>{" "}
                    <span>Social Accounts</span> 
                  </Link>
                </li>

                <li className="submenu">
                  <Link
                    to="/contactlist"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={menuicon10} alt="" />
                    </span>{" "}
                    <span>Contacts</span> 
                  </Link>
                </li>
                
                {/* Subscriber  */}

                <li className="submenu">
                  <Link
                    to="/subscribers"
                    id="menu-item4"
                    onClick={(e) => handleClick(e, "menu-item4", "menu-items4")}
                  >
                    <span className="menu-side">
                      <img src={menuicon10} alt="" />
                    </span>{" "}
                    <span>Subscribers</span> 
                  </Link>
                </li>


                

              </ul>
              <div className="logout-btn">
                <Link onClick={handleLogout}>
                  <span className="menu-side">
                    <img src={logout} alt="" />
                  </span>{" "}
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  )
}
export default Sidebar
