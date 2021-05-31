import React from 'react'
import './MyNavbar.css'
import cybexLogo from './cybexLogo.png'
import {Link} from 'react-router-dom'
function MyNavbar({register, setRegister}) {
    return (
     <nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
    <img src = {cybexLogo} alt = "Cybex" className = "cybex__logo"/>

  <div className="navbar__div " id="navbarSupportedContent">
    <ul className="navbar__ul navbar-nav">
      <li className="nav-item">
        {/* <a className="nav-link" style = {{color: "black"}} href = "/frontend_clients" >Klientat</a> */}
       <Link to = "/post_clients" style = {{textDecoration:"none"}}> <a className="nav-link" style = {{color: "black",textDecoration:"none",border:'2px solid black'}}>Klientët</a></Link>
      </li>
      <li className="nav-item">
        <Link to = "/paid_clients" style = {{textDecoration:"none"}}><a className="nav-link" style = {{color: "black",border:'2px solid black'}}>Klientët Me Pagesë</a></Link>
      </li>
      <li className="nav-item">
        {/* <a className="nav-link" style = {{color: "black"}} href = "/frontend_clients" >Klientat</a> */}
       <Link to = "/three_month_clients" style = {{textDecoration:"none"}}> <a className="nav-link" style = {{color: "black",textDecoration:"none",border:'2px solid black'}}>Klientët Mbi 3 Muaj</a></Link>
      </li>
      <li className="nav-item">
        <Link to = "/not_paid_clients" style = {{textDecoration:"none"}}><a className="nav-link" style = {{color: "black",border:'2px solid black'}}>Klientët Pa Pagesë</a></Link>
      </li>
      
    </ul>
  </div>
  </div>
</nav>
    )
}

export default MyNavbar
