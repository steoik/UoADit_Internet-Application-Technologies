import { useContext, useEffect, useState } from 'react';
import './Admin.css';

import { getUsers, hostRequest } from '../api/userAPI';
import Pagination from '../components/Pagination';

const Admin = () => {

  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('userList');

  const translateRole = (role) => {
    if (role == 'tenant')
      return 'Ενοικιαστής'
    else if (role == 'host')
      return 'Οικοδεσπότης'
    else if (role == 'admin')
      return 'Διαχειριστής'
    else 
      return 'error'
  }

  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  let indexOfFirstItem = (currentPage-1) * itemsPerPage;
  let indexOfLastItem = indexOfFirstItem + itemsPerPage;
  let currentUsers = users.slice(indexOfFirstItem, indexOfLastItem)

  const handleHostRequest = async (username, status) => {
    await hostRequest(username, status)
    await fetchUsers()
  }

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setTotalItems(fetchedUsers.length)
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }
  
  useEffect(() => {
    fetchUsers();
  }, [])

  return (

    <div className='admin'>
      <div className='admin__navbar'>
        <button onClick={() => setTab('userList')}>Λίστα Χρηστών</button>
        <button onClick={() => setTab('data')}>Δεδομένα</button>
      </div>
      <div className='admin__content'>
        { tab == 'userList' &&
        <>
          <table className='admin__userList'>
            <tbody>
              <tr className='userList-header'>
                <th>Όνομα Χρήστη</th>
                <th>Όνομα</th>
                <th>Επώνυμο</th>
                <th>email</th>
                <th>Ρόλος</th>
                <th>Αίτημα Οικοδεσπότη</th>
              </tr>

              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{translateRole(user.role)}</td>
                  <td>
                    <div className='hostRequest__buttons'>
                    { user.host_request_status == 'pending' ? (
                    <>
                        <button onClick={() => handleHostRequest(user.username, 'approved')} id='approve'>Έγκριση</button>
                        <button onClick={() => handleHostRequest(user.username, 'denied')} id='deny'>Απόρριψη</button>
                    </>
                    ) : (
                      <p>-</p>
                      )
                    }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='pagination__wrapper'>
            <Pagination 
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
        }
        { tab == 'userList' &&
        <>
        
        </>
        }
      </div>
    </div>
  )

}

export default Admin;