import React from 'react'
import statusSuccess from '../images/UnionNeOK.svg';
import statusUnsuccess from '../images/UnionOk.svg'
function InfoTooltip(props) {
    return (
        <section onClick={props.onOverlayClose} className={`popup popup_type_sign ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">

                        <img className='popup__sign-image' src={`${props.onResponse ? statusSuccess : statusUnsuccess}`} />
                        <h2 className={`popup__title`}>{`${props.onResponse ? props.regSuccess : props.regUnsaccess}`}</h2>
                    
                <button onClick={props.onClose} className={`popup__close popup__close_sign`} type="button"></button>
            </div>
        </section>
    )
}
export default InfoTooltip;