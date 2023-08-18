import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


const Home = () => {

  const { AuthData } = useContext(AuthContext);

  return (
    <div>
      HOME Page
      {AuthData.isLoggedIn ? (
        <p>Logged in</p>
      ) : (
        <p>Logged out</p>
      )}
    </div>
  )
}

export default Home