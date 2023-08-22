import { useContext, useState } from 'react';
import './LogIn.css';
import { AuthContext } from "../contexts/AuthContext";

import Close from '../assets/close_FILL0_wght500_GRAD200_opsz40.svg'

const LogIn = (props) => {

  const { login } = useContext(AuthContext);

  const [logInData, setLogInData] = useState({
    user_name: '',
    password: ''
  })
  const handleLogIn = async () => {

    login(logInData.user_name, logInData.password)
    props.toggleModal('logIn')
  }

  return (
    <div className='logIn__container'>
      <h2>Σύνδεση</h2>
      <form>
        <label>Όνομα Χρήστη</label>
        <input
          type='text'
          name='username'
          onChange={(e) => setLogInData(prevData => ({ ...prevData, ['user_name']: e.target.value }))}
        />
        <label>Κωδικός</label>
        <input
          type='password'
          name='password'
          onChange={(e) => setLogInData(prevData => ({ ...prevData, ['password']: e.target.value }))}
        />
      </form>

      <button onClick={handleLogIn}>Σύνδεση</button>
      <button id='closeModalBtn' onClick={() => props.toggleModal('signUp')}>
          <img src={Close} />
      </button>
    </div>
  )

}

export default LogIn;