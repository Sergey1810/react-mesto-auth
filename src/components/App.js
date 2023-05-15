import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import { api } from '../utils/Api'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({isOpen:false})
  const [cards, setCards] = useState([])

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.isOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  useEffect(()=>{
    api.getUserInfo().then((users)=>{
       setCurrentUser(users)
       
    })
    .catch((e) => console.log(e))
   },[])

   useEffect(()=>{
    api.getInitialCards().then((cards)=>{
       setCards(cards)
    })
    .catch((e) => console.log(e))
   },[])

  const handleCardClick = (card) => {
    setSelectedCard({
      card : card,
      isOpen : true
    })
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard( {isOpen:false} )
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen( !isEditProfilePopupOpen )
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen( !isEditAvatarPopupOpen )
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen( !isAddPlacePopupOpen )
  }

function handleCardLike(item) {

if(item.card.likes.some(like => like._id === currentUser._id)){
  api
    .setRemoveLike(item.card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === item.card._id ? newCard : c));
    })
    .catch(err => console.log(err))
}else{
  api
    .setAddLike(item.card._id)
    .then((newCard)=>{
      setCards((state) => state.map((c) => c._id === item.card._id ? newCard : c));
    })
    .catch(err => console.log(err))      
}}

function handleCardDelete(id){
   api
     .setDeleteCard(id)
       .then(() =>{
         setCards((state) => state.filter((item) => item._id !== id))  
       })
       .catch(err => console.log(err)) 
}

const handleUpdateUser =(user)=>{
  api
    .setUserInfo(user.name, user.about)
      .then((res) =>{
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err)) 
}

const handleUpdateAvatar = (avatar) => {
  api
    .setChangeAvatar(avatar)
      .then((res) =>{
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err)) 
}

const handleAddPlaceSubmit = (card) => {
  api
    .setAddCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header/>
          <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            cards={cards}
            onCardDelete={handleCardDelete}
          />
          <Footer/>
        </div>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 

        <AddPlacePopup isOpen={isAddPlacePopupOpen}  onClose={closeAllPopups} onAddCard = {handleAddPlaceSubmit}/>
    
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  onUpdateAvatar={handleUpdateAvatar}/> 

        <ImagePopup card = {selectedCard} onClose={closeAllPopups}/>
      </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
