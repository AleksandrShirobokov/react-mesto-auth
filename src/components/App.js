import React, {useEffect} from 'react'
import Header from './Header' 
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {

    const [cards, setCards] = React.useState([]) 
    const [currentUser, setCurrentUser] = React.useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); 
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); 
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); 
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isPopupImageOpen, setPopupImageOpen] = React.useState(false)

    useEffect(() => {
        Promise.all([
            api.getInitialCards(),
            api.getUserInfoMe()
        ])
        .then((data) => { 
            const [dataCard, dataUser] = data;
            setCards(dataCard)
            setCurrentUser(dataUser);
        })
        .catch(err=>console.log(err))
    },[])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setPopupImageOpen(true)
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setPopupImageOpen(false)
    }

    function handleOverlayClose(evt) {
        if(evt.target === evt.currentTarget) {
            closeAllPopups()
        }
    }

    React.useEffect(() => {
        function handleEscClose(evt) {
            if(evt.key === 'Escape') {
                closeAllPopups()
                console.log('esc')
            }
        }
        document.addEventListener('keydown', handleEscClose);
        return () => {
            document.removeEventListener('keydown', handleEscClose)
        }
    })
    
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err=>console.log(err));
    }

    function handleDeleteCard(card) {
        api.delCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id)
        )})
        .catch(err=>console.log(err))
    }

    function handleUpdateUser(data) {
        api.changeUserInfo(data)
        .then((data) => {
            setCurrentUser(data)
            closeAllPopups()
        })
        .catch(err=>console.log(err))
    }

    function handleUpdateAvatar(data) {
        api.editAvatar(data)
        .then((data) => {
            setCurrentUser(data)
            closeAllPopups()
        }) 
        .catch(err=>console.log(err))
    }

    function handleAddPlaceSubmit(data) {
        api.postNewCard(data)
        .then((data) => {
            setCards([data, ...cards])
            closeAllPopups()
        })
        .catch(err=>console.log(err))
    }

    return (
    <>
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />  
                <Main 
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCard}
                />
                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onOverlayClose={handleOverlayClose} onUpdateUser={handleUpdateUser}></EditProfilePopup>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onOverlayClose={handleOverlayClose} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onOverlayClose={handleOverlayClose} onAddCard={handleAddPlaceSubmit}></AddPlacePopup>
                    
                <ImagePopup card={selectedCard} isOpen={isPopupImageOpen} onClose={closeAllPopups} onOverlayClose={handleOverlayClose}/> 

                <PopupWithForm name="delete" title="Вы уверены?" /* isOpen="popup_opened" *//>
            </CurrentUserContext.Provider>
        </div>

    </>  
  );
  
}

export default App;
