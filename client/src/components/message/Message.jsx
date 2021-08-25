import React from "react";
import "./message.css";
import {format} from "timeago.js";

const Message = ({message, own}) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="./assets/person/2.jpeg" alt="" className="messageImg" />
        <p className="messageTxt">{message.text}</p>
      </div>
      <div className="messageBottom"> {format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
