import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../index.css'


export default function Header(props) {
const navigate = useNavigate()

function singOut(){
  localStorage.removeItem('token')
  navigate('/sign-in')
}

  return (
   <header className="header">
     <div className="header__logo"></div>
    <div>
      <p className='header__title'>{props.email}</p>
      <nav className="menu">
      <Link to="/sign-in" className= {`menu__item ${props.isAuth ? "menu__item_active" : ""}`}>Войти</Link>
      <Link to="/sign-up" className={`menu__item ${props.isAuth ? "menu__item_active" : ""}`}>Регистрация</Link>
    </nav>
    <button className='header__button' onClick={singOut}>Выйти</button>
    </div>
     
   </header>
  )
}
