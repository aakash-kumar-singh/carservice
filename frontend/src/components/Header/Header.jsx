import React, { useState, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";

import "../../styles/header.css";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/cars", display: "Cars" },
  { path: "/blogs", display: "Blog" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = () =>
    setShowProfileDropdown(!showProfileDropdown);

  const username = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="header" >
<div className="header__top" >
<Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span className="text-white">Need Help?</span>
                <span className="header__top__help text-white ">
                  <i className="ri-phone-fill"></i> +91 9999999999
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6" className="d-flex justify-content-end">
              <Link to="/login" className="d-flex align-items-center gap-1 text-white">
                <i className="ri-login-circle-line text-white"></i> Login 
              </Link>
              <Link to="/register" className="d-flex align-items-center gap-1 text-white">
                <i className="ri-user-line"></i> Register
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Middle Header */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="6">
              <div className="logo">
                <h1>
                  <Link to="/home" className="d-flex align-items-center gap-2">
                    <i className="ri-car-line"></i>
                    <span>
                      Rent Car <br /> Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col
              lg="4"
              md="5"
              sm="6"
              className="d-flex align-items-center justify-content-center"
            >
              <div className="header__location main__navbarr d-flex align-items-center gap-2">
                <i className="ri-earth-line"></i>
                <div>
                  <h4>India</h4>
                  <h6>Aurangabad, Bihar</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="4"
              md="4"
              sm="12"
              className="d-flex justify-content-end align-items-center"
            >
              <button className="header__btn btn">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Navigation */}
      <div className="main__navbar " >
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            {/* Mobile Menu Toggle */}
            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>

            {/* Navigation Links */}
            <div
              className={`navigation ${isMenuOpen ? "menu__active" : ""}`}
              ref={menuRef}
              onClick={toggleMenu}
            >
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Search Box */}
            <div className="nav__right d-flex align-items-center gap-3">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>

              {/* Profile Icon */}
              <div
                className="profileicon "
                onClick={toggleProfileDropdown}
                style={{ cursor: "pointer" }}
              >
                <i className="ri-user-line"></i>
              </div>
              {showProfileDropdown && (
                <div className="profile__dropdown">
                  <p>{username}</p>
                  <p>{email}</p>
                  {username && (
                    <button
                      onClick={handleLogout}
                      className="btn btn-danger btn-sm"
                    >
                      Logout
                    </button>
                  )}
                  {!username && (
                    <Link
                      to="/register"
                      className="d-flex align-items-center gap-1"
                    >
                      <button className="btn btn-danger btn-sm">
                        Register{" "}
                      </button>
                    </Link>
                  
                  )}
                   {!username && (
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-1"
                    >
                      <button className="btn btn-danger btn-sm">
                        Login{" "}
                      </button>
                    </Link>
                  
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
