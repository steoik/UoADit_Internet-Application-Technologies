import { useContext, useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from './pages/Home'
import UserList from './pages/UsersList'
import NotFound from './pages/NotFound'

import AuthContextProvider from "./contexts/AuthContext";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Views />
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
          path: "/userlist",
          element: <UserList />
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