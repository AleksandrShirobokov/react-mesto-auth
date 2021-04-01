import React from 'react'
import { Switch, Route } from 'react-router-dom'
function InfoTooltip(props) {
    return (
        <section onClick={props.onOverlayClose} className={`popup popup_type_sign ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <Switch>
                    <Route path="/sign-in">
                        <div className="popup__logo"></div>
                        <h2 className={`popup__response`}>Вы успешно зарегистрировались!</h2>
                    </Route>
                    <Route path="/sign-up">
                        <div className="popup__logo"></div>
                        <h2 className={`popup__response`}>Что-то пошло не так! Попробуйте еще раз.</h2>
                    </Route>
                </Switch>
                <button onClick={props.onClose} className={`popup__close popup__close_sign`} type="button"></button>
            </div>
        </section>
    )
}
export default InfoTooltip;