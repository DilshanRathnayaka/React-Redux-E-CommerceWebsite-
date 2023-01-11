import React from 'react'
import { useSelector } from 'react-redux'

function Navbar(props) {
  const { cartTotalQuantity } = useSelector(state => state.cart)
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <a href="/" > <svg className='logo' id="logo-72" width="52" height="44" viewBox="0 0 53 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z" class="ccustom" fill="#212326"></path> </svg></a>
        <a className="navbar-brand" href="#">Shippy Pro</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className='login-btn' href="/">Home</a>
            </li>
          </ul>
          <div className='login-action'>

          {props.isLoggedIn ? (
            <a className='login-btn' href="/Login">Login</a>

             ) : (
          
           <div class="login-btn dropdown">
             <i type="button" data-bs-toggle="dropdown" aria-expanded="false" class=" fa-solid fa-user-tie btn btn-outline-secondary dropdown-toggle" ></i>       
             <ul class="dropdown-menu">
               <li><a class="dropdown-item" href="#">Profile</a></li>
               <li><a class="dropdown-item" href="/Logout">Logout</a></li>           
             </ul>
           </div>
        
        )}

            <a className='cartimg' href="/Cart"><i class="fa-solid fa-cart-shopping"><span className='number'>{cartTotalQuantity}</span></i></a>
          </div>
        </div>
      </div>
    </nav>


  )
}

export default Navbar