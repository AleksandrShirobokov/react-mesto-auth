import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

function Header() {
    return (
        <header className="header">
            <div className="header__wrapper">
            <div className="header__logo"></div>
            <Switch>
                <Route exact path="/">
                    <div className="header__container">
                        <p className="header__email">Email@email.cum</p>
                        <Link to="sign-in" className="header__link">Выйти</Link>
                    </div>
                </Route>

                <Route path="/sign-in">
                    <Link to="sign-up" className="header__link">Зарегистрироваться</Link>
                </Route>

                <Route path="/sign-up">
                    <Link to="sign-in" className="header__link">Войти</Link>
                </Route>
            </Switch>
            </div>
        </header>    
    )
} 
export default Header;