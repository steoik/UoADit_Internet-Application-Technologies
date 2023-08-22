import { createContext, useState } from "react"

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  
  const [AuthData, setAuthData] = useState({
    isLoggedIn: false,
    username: "",
    role: "anonymous"
  });

  const login = async (username, password) => {
    try {
      const response = await fetch('/api/users/'+username+'/');
      if (!response.ok)
        throw new Error("User not found");
      const data = await response.json();
      if (password == data.password) {
        setAuthData({
          isLoggedIn: true,
          username: data.user_name,
          role: data.role,
        });
        // Get profile picture
        console.log('User logged in')
      } else {
        setAuthData({
          isLoggedIn: false,
          username: "",
          role: "anonymous",
        });
        throw new Error("Password is incorrect");
      }
    }
    catch (error) {
      console.log(error.message);
    }
    finally {
      console.log(AuthData)
    }
  };
  
  const logout = () => {
    setAuthData({
      isLoggedIn: false,
      username: "",
      role: "anonymous",
    });
    console.log('User logged out')
  };

  return (
    <AuthContext.Provider value={{ AuthData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;