import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function InfoTooltip(props) {

  return (
     <PopupWithForm isOpen={props.isOpen}  onClose={props.onClose} name = 'infoTooltip' title = 'Редактировать профиль'>

     </PopupWithForm>
  )
}
