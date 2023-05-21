import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../index.css'


export default function Header(props) {
  const navigate = useNavigate()

  function singOut() {
    localStorage.removeItem('token')
    props.handleLoginOut()
    navigate('/sign-in')
  }

  const location = useLocation()


  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className='header__info'>
        <p className='header__title'>{props.userData}</p>
        <nav className="menu">
          {location.pathname === '/sign-up' && <Link to="/sign-in" className= 'menu__item'>Войти</Link>}
          {location.pathname === '/sign-in' && <Link to="/sign-up" className= 'menu__item'>Регистрация</Link>}
        </nav>
        {props.isAuth?<button className='header__button' onClick={singOut}>Выйти</button>:null}
        <button className='header__nav'/>
      </div>
    </header>
  )
}
