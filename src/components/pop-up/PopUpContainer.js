import React, { useState, useEffect } from 'react';
import PopUpElement from "./PopUpElement";
import PropTypes from "prop-types";

const PopUpContainer = ({ trigger, setTrigger, data }) => {

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (trigger === 1)
    {
      createNotification(data.title, data.message);
      setTrigger(0);
    }
  })

  const createNotification = async (title, message) => 
  {
    if (!notification)
    {
      setNotification(<PopUpElement title={title} message={message} />);
      await setTimeout(() => { setNotification(null); }, 3000);
    }
  }

  return (
    <div>
      {(notification != null) && notification}
    </div>
  )
}

PopUpContainer.propTypes = {
  trigger: PropTypes.number.isRequired,
  setTrigger: PropTypes.func.isRequired
};

export default (PopUpContainer);