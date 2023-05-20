import { useState } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/Api';

export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

      const navigate = useNavigate();
    
      const handleChangeEmail = (e) => {
        setEmail(e.target.value)
      }
      const handleChangePassword = (e) => {
        setPassword(e.target.value)
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        if (password){
          api.register(password, email).then((res) => {
            navigate('/sign-in', {replace: true});
            console.log(res)
            }
          );
        }
      }
    

  return (
    <div className='auth'>
            <form onSubmit={handleSubmit}> 
                <h2 className='popup__title auth__title'>Регистрация</h2>
                <div className='auth__form'>

                    <input
                        type="text"
                        className="auth__input"
                        value={email || ''}
                        name="title"
                        placeholder="Email"
                        minLength="2"
                        maxLength="30"
                        required
                        onChange={handleChangeEmail} />

                    <input
                        type="password"
                        className="auth__input"
                        value={password || ''}
                        name="url"
                        placeholder="Пароль"
                        required
                        onChange={handleChangePassword} />

                </div>
                <button className="popup__btn-save auth__btn" type="submit">Войти</button>
            </form>
        </div>
  )
}
