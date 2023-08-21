import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const User = ({ props }) => {
  
  let [user, setUser] = useState([])
  let { un } = useParams(); 
  
  useEffect(() => {
    document.title = un + ' | Website';
    getUser();
  }, [])
  
  let getUser = async () => {
    let response = await fetch('/users/' + un)
    let data = await response.json()
    setUser(data)
    console.log(user)
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.user_name}</p>
      <p>Password: {user.password}</p>
      <p>Created: {user.created}</p>
    </div>
  )
}

export default User