import React from 'react'
import * as auth from '../utils/auth'
import { useHistory } from 'react-router-dom'

function Login(props) {
    const history = useHistory();
    /* const [message, setMessage] = React.useState('') */
    const [info, setInfo] = React.useState({
        password:'',
        email:''
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!info.password || !info.email) {
            return
        }
        auth.authorize(info.password, info.email)
        .then((data) => {
            if(data.token) {
                setInfo({password:'', email:''});
                    props.onLogin();
                    history.push('/');  
            }
        })
        .catch((err) => {
            if(err === 400) {
                console.log('*Не передано одно из полей')
            } 
            if(err === 401) {
                console.log('*Пользователь с email не найден')
            }    
        })
    }

        return(
          <div className="login">
            <p className="login__enter">
              Вход
            </p>
            <form onSubmit={handleSubmit} className="login__form">
                <input className="login__input login__input_type_username" placeholder="Email" required id="email" name="email" type="text" value={info.email} onChange={handleChange} />
                <input className="login__input login__input_type_password" placeholder="Пароль" required id="password" name="password" type="password" value={info.password} onChange={handleChange} />
                <button type="submit" className="login__link login__button">Войти</button>  
            </form>
          </div>
        )
}
export default Login;