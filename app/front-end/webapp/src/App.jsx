import { useContext, useMemo } from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";

import './App.css'

import Home from './pages/Home'
import Listings from './pages/Listings'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

import UserList from './pages/UsersList'
import User from './pages/User'

import Header from './components/Header'
import Footer from './components/Footer'

import AuthContextProvider from "./contexts/AuthContext";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Views />
      <Footer />
    </AuthContextProvider>
  )
}

function Views() {

  const { authData } = useContext(AuthContext);

  const ViewRouter = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/listings",
          element: <Listings />
        },
        {
          path: "/admin",
          element: <>{authData.role == "admin" ? <Admin /> : <Navigate to={"/"} />}</>
        },
        {
          path: "/user",
          element: <UserList />
        },
        {
          path: "/user/:un",
          element: <User />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]),
    [authData]
  );

  return <RouterProvider router={ViewRouter} />;
}

export default App;