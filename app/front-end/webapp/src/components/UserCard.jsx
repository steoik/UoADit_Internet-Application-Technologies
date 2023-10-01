import React, { useEffect, useState } from "react";
import { getUser } from "../api/userAPI";
import { translate_role_EN_GR } from "../utils/translate";
import "./UserCard.css";

const UserCard = (props) => {
  const API_URL = 'http://127.0.0.1:8000';
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  }

  const fetchUserInfo = async () => {
    try {
      const fetchedUserInfo = await getUser(props.username);
      setUserInfo(fetchedUserInfo);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="userCard">
      {!isLoading ? (
        <div className="userCard__user">
          <img src={`${API_URL}${userInfo.profile_picture}`} alt="User Profile" />
          <p className="userCard__role">{translate_role_EN_GR(userInfo.role)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="userCard__info">
        <p className="userCard__username">{userInfo.username}</p>
        <p className="userCard__date_joined">Μέλος από: {formatDate(userInfo.date_joined)}</p>
      </div>
    </div>
  );
};

export default UserCard;