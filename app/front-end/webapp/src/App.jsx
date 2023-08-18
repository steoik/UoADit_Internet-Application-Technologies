import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import UserListPage from './pages/UsersListPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="userlist" element={<UserListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
