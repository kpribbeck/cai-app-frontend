import React from 'react';
import "./PopUp.css";

const PopUpElement = ({title, message}) => {
  return (
    <div className="popup-container">
      <div id="popup-title" >{title}</div>
      <div id="popup-message" >{message}</div>
    </div>
  )
}

export default (PopUpElement);