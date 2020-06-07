import React from "react";
import { withRouter } from "react-router-dom";
import Chats from "./Chats";
import "./Chat.css";

export const Footer = () => {
  return (
    <div className="footer">
      <Chats />
    </div>
  );
};

export default withRouter(Footer);
