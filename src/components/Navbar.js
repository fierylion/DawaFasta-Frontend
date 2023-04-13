import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import BsFillCaretDownFill from 'react-icons/bs'

const Navbar = () => {
  return (
    <>
      <nav
        className='navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-nowrap'
        aria-label='Offcanvas navbar large'
      >
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            <img src={logo} alt='logo' className='logo' />
            <b>Dawa Fasta</b>
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar2'
            aria-controls='offcanvasNavbar2'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div
            className='offcanvas offcanvas-end text-bg-dark nav-canva'
            tabIndex={-1}
            id='offcanvasNavbar2'
            aria-labelledby='offcanvasNavbar2Label'
          >
            <div className='offcanvas-header'>
              <h5 className='offcanvas-title' id='offcanvasNavbar2Label'>
                Dawa Fasta
              </h5>
              <button
                type='button'
                className='btn-close btn-close-white'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              />
            </div>
            <div className='offcanvas-body'>
              <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                <li className='nav-item'>
                  
                    <a className='nav-link active' aria-current='page' href='/'>
                      Home
                    </a>
        
                </li>
                <li className='nav-item'>
                  
                    <a className='nav-link active' aria-current='page' href='/register'>
                      Register
                    </a>
            
                </li>
                <li className='nav-item'> 
                    <a className='nav-link active' href='/about'>
                      About Us
                    </a>
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='#'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Login
                  </a>
                  <ul className='dropdown-menu'>
                    <li>
                      <a className='dropdown-item' href='/company/login'>
                        Company Login
                      </a>
                    </li>
                    <li>
                      <hr className='dropdown-divider' />
                    </li>
                    <li>
                      <a className='dropdown-item' href='/user/login'>
                        Customer Login
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <form className='d-flex mt-3 mt-lg-0' role='search'>
                <input
                  className='form-control me-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                />
                <button className='btn btn-outline-success' type='submit'>
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
