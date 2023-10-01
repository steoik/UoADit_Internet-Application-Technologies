import { useEffect, useState } from "react"
import UserCard from "../components/UserCard"
import { useParams } from "react-router-dom";

import './Profile.css'
const Profile = () => {

  const { username } = useParams(); 

  return (
    <div className="profile">
      <UserCard 
        username={username}
      />
    </div>
  )
}

export default Profile;