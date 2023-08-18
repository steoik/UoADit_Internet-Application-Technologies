import { createContext, useState } from "react"

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  
  const [AuthData, setAuthData] = useState({
    isLoggedIn: false,
    username: "",
    role: "anonymous",
  });

  const login = (username, role) => {
    setAuthData({
      isLoggedIn: true,
      username,
      role,
    });
  };

  const logout = () => {
    setAuthData({
      isLoggedIn: false,
      username: "",
      role: "anonymous",
    });
  };

  return (
    <AuthContext.Provider value={{ AuthData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;