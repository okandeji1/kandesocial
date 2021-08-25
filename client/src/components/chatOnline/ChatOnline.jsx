import React, {useState, useEffect} from "react";
import axios from "axios";
import "./chatOnline.css";

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = async (user) => {
    try {
      const res = axios.get(`/conversations/find/${currentId}/${user._id}`);
      if (res) {
        setCurrentChat(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`/users/friends/${currentId}`);
        if (res) {
          setFriends(res.data);
        }
      } catch (error) {}
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);

  return (
    <div className="chatOnline">
      {onlineFriends.map((onlineFriend) => (
        <div
          className="chatOnlineFriend"
          onClick={() => handleClick(onlineFriend)}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={
                onlineFriend?.profilePicture
                  ? PF + onlineFriend?.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{onlineFriend.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
