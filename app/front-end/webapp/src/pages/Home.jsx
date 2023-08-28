import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import './Home.css'

const Home = () => {

  const { authData } = useContext(AuthContext);

  return (
    <div className="home">
      HOME Page
      {authData.isLoggedIn ? (
        <p>Logged in</p>
      ) : (
        <p>Logged out</p>
      )}
    </div>
  )
}

export default Home