import { createContext, useEffect, useState } from "react"
import jwt_decode from "jwt-decode"

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
   
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  let [authData, setAuthData] = useState(() => localStorage.getItem('authData') ? 
    {
      isLoggedIn: true, 
      username: JSON.parse(localStorage.getItem('authData')).username, 
      role: JSON.parse(localStorage.getItem('authData')).role
    } :
    {
      isLoggedIn: false, 
      username: '', 
      role: 'anonymous'
    }
  )
  let [loading, setLoading] = useState(true)

  const updateToken = async () => {
    if (authTokens) {
      let response = await fetch('/api/token/refresh/', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({'refresh':authTokens?.refresh})
      })
      if (response.ok) {
        let data = await response.json()
        setAuthTokens(data)
        localStorage.setItem('authTokens', JSON.stringify(data))
      } else {
        logout()
      }
    }

    setLoading(false)
  }

  useEffect(() => {

    if (loading)
      updateToken()

    let fourMinutes = 1000 * 60 * 4  
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, fourMinutes)
    return ()=> clearInterval(interval)
  }, [authTokens, loading])

  const login = async (username, password) => {
    let response = await fetch('/api/token/', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'username':username, 'password':password})
    })
    if (response.ok) {
      let data = await response.json()
      let decoded_data = jwt_decode(data.access)
      setAuthData(
        {
          isLoggedIn: true,
          username: decoded_data.username, 
          role: decoded_data.role
        }
      )
      setAuthTokens(data)
      localStorage.setItem('authData', JSON.stringify(decoded_data))
      localStorage.setItem('authTokens', JSON.stringify(data))
      console.log('User logged in')
    } else {
      console.log('Log in failed')
    }
  };

  const logout = () => {
    setAuthData(
      {
        isLoggedIn: false, 
        username: '', 
        role: 'anonymous'
      }
    )
    setAuthTokens(null)
    localStorage.removeItem('authData');
    localStorage.removeItem('authTokens');
    console.log('User logged out')
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;