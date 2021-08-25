import React, {useState, useEffect} from "react";
import axios from "axios";
import "./conversation.css";

const Conversation = ({conversation, currentUser}) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((y) => y !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${friendId}`);
        if (res) {
          setUser(res.data);
        }
      } catch (error) {}
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? user?.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
