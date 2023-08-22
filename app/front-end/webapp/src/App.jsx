import { useContext, useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import './App.css'

import Home from './pages/Home'
import UserList from './pages/UsersList'
import User from './pages/User'
import NotFound from './pages/NotFound'

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

  const { AuthData } = useContext(AuthContext);

  const ViewRouter = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <Home />
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
    [AuthData]
  );

  return <RouterProvider router={ViewRouter} />;
}

export default App;