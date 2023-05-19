import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css'


export default function Header(props) {
const navigate = useNavigate()

function singOut(){
  localStorage.removeItem('token')
  navigate('/sing-in')
}

  return (
   <header className="header">
     <div className="header__logo"></div>
    <div>
      <p>{props.email}</p>
      <nav className="menu">
      <Link to="/sign-in" className= {`menu__item ${props.isAuth ? "menu__item_active" : ""}`}>Домой</Link>
      <Link to="/sign-up" className={`menu__item ${props.isAuth ? "menu__item_active" : ""}`}>Советы</Link>
    </nav>
    <button onClick={singOut}></button>
    </div>
     
   </header>
  )
}
