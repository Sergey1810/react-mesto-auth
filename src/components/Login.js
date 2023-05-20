import React, { useState } from 'react'
import { api } from '../utils/Api'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        api.authorize(password, email)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    setEmail('');
                    setPassword('');
                    props.handleLogin();
                    navigate('/', { replace: true });
                }
            })
            .catch(props.handleInfoTooltipClick());
    }

    return (
        <div className='auth'>
            <form onSubmit={handleSubmit}> 
                <h2 className='popup__title auth__title'>Вход</h2>
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
                        onChange={onChangeEmail} />

                    <input
                        type="password"
                        className="auth__input"
                        value={password || ''}
                        name="url"
                        placeholder="Пароль"
                        required
                        onChange={onChangePassword} />

                </div>
                <button className="popup__btn-save auth__btn" type="submit">Войти</button>
            </form>
        </div>
    )
}
