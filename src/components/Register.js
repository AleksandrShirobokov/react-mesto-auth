import React from 'react'
import { Link } from 'react-router-dom'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render(){
        return(
          <div className="register">
            <p className="register__enter">
              Регистрация
            </p>
            <form onSubmit={this.handleSubmit} className="register__form">
                <input className="register__input register__input_type_username" placeholder="Email" required id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
                <input className="register__input register__input_type_password" placeholder="Пароль" required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                <button type="submit" className="register__link register__button">Зарегистрироваться</button>  
            </form>
            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="sign-in" className="register__login-link">Войти</Link>
            </div>
          </div>
        )
    }
}

export default Register;