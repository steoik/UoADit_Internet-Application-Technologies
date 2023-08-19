import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


const UserList = () => {
  let [users, setUsers] = useState([])
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  // useEffect(() => {
  //   console.log(username, password)
  // }, [username, password])


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

  let deleteUser = async (user_name) => {
    fetch('/api/users/' + user_name + '/delete', {
      method: 'DELETE',
      'headers': {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }

  let createUser = async () => {
    fetch('/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: username,
        password: password
      })
    })
    .then(() => {
      setUsername("");
      setPassword("");
      
      getUsers();
    })
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: "10px", height: "40px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={createUser}>Create User</button>
      </div>
      {users.map((user, index) => (
        <div key={index} style={{ display: 'flex' }}>
          <Link to={'/user/' + user.user_name}>
            <h3 style={{ fontSize: '40px', margin: '15px' }}>{user.user_name}</h3>
          </Link>
          <button onClick={() => deleteUser(user.user_name)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "default",
              fontSize: "inherit",
              textDecoration: "none",
              color: "inherit",
            }}>
            <img src="/src/assets/delete.svg" alt="Delete" width="40px" />
          </button>
        </div>
      ))}
    </>
  )
}

export default UserList