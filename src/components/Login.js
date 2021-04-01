import React from 'react'
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault()
    }

    render(){
        return(
          <div className="login">
            <p className="login__enter">
              Вход
            </p>
            <form onSubmit={this.handleSubmit} className="login__form">
                <input className="login__input login__input_type_username" placeholder="Email" required id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
                <input className="login__input login__input_type_password" placeholder="Пароль" required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                <button type="submit" className="login__link login__button">Войти</button>  
            </form>
          </div>
        )
    }
}

export default withRouter(Login)