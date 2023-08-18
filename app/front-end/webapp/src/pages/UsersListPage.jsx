import { useEffect, useState } from "react"


const UserListPage = () => {
  let [users, setUsers] = useState([])

  useEffect(() => {
    document.title = 'UserList | Website';
    getUsers()
  }, [])

  let getUsers = async () => {
    let response = await fetch('/api/users/')
    let data = await response.json()
    setUsers(data)
    console.log(users)
  }

  return (
    <div>
      {users.map((user, index) => (
        <h3 key={index}>{user.user_name}</h3>
      ))}
    </div>
  )
}

export default UserListPage