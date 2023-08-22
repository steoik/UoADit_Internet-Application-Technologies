import { useContext, useState } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import './SignUp.css';
import { createUser, updateProfilePicture } from '../api/userAPI'

import CheckCircle_W500_O24 from '../assets/check_circle_FILL0_wght500_GRAD200_opsz24.svg'
import CheckCircle_W400_O48 from '../assets/check_circle_FILL0_wght400_GRAD0_opsz48.svg'
import Close from '../assets/close_FILL0_wght500_GRAD200_opsz40.svg'
import DefaultProfile from '../assets/person_FILL0_wght300_GRAD0_opsz48.svg'

const SignUp = (props) => {
  
  const { login } = useContext(AuthContext);
  
  const [signUpData, setSignUpData] = useState({
    user_name: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    profile_picture: null,
    requestHost: false
  });

  const [tab, setTab] = useState(0);
  const nextTab = () => { setTab((tab) => tab + 1) }
  const handleTabChange = async () => {
    if (tab == 0) {
      // Check if the username is taken
      // Check if the password confirmPassword match
      nextTab()
    } else if (tab == 1) {
      // Check if the email is taken
      nextTab()
    } else if (tab == 2) {
      let data = {          
        user_name: signUpData.user_name,
        password: signUpData.password,
        first_name: signUpData.first_name,
        last_name: signUpData.last_name,
        email: signUpData.email,
        phone: signUpData.phone,
      }
      await createUser(data)
      
      await updateProfilePicture(signUpData.user_name, signUpData.profile_picture)
      
      login(signUpData.user_name, signUpData.password)
    
      nextTab()
    }
  }

  return (
    <div className='signUp__container'>
      <div className='signUp__sidebar'>
        <div className='signUp__sidebar__information'>
          <h3>Μέσω του λογαριασμού σου:</h3>
          <ul>
            <li>
              <img src={CheckCircle_W500_O24} alt='CheckCircle_W500_O24' />
              <span>Κάνεις κρατήσεις</span>
            </li>
            <li>
              <img src={CheckCircle_W500_O24} alt='CheckCircle_W500_O24' />
              <span>Δημιουργείς αγγελίες</span>
            </li>
            <li>
              <img src={CheckCircle_W500_O24} alt='CheckCircle_W500_O24' />
              <span>Γράφεις κριτικές</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='signUp__body'>
        {(tab >= 0 && tab <= 2) &&
          <>
            <h2>Καλωσήρθες στο <span>Website</span>!</h2>
            <small>Ακολούθησε την φόρμα εγγραφής για να δημιουργήσεις τον δικό σου λογαριασμό!</small>
          </>
        }
        {tab == 0 &&
          <>
            <form>
              <label>Όνομα Χρήστη</label>
              <input
                type='text'
                name='username'
                onChange={(e) => setSignUpData(prevData => ({ ...prevData, ['user_name']: e.target.value }))}
              />
              <label>Κωδικός</label>
              <input
                type='password'
                name='password'
                onChange={(e) => setSignUpData(prevData => ({ ...prevData, ['password']: e.target.value }))}
              />
              <label>Επιβεβαίωση Κωδικού</label>
              <input
                type='password'
                name='confirm_password'
                onChange={(e) => setSignUpData(prevData => ({ ...prevData, ['confirmPassword']: e.target.value }))}
              />
            </form>

            <button onClick={() => handleTabChange()}>Συνέχεια</button>
          </>
        }
        {tab == 1 &&
          <>
            <form>
              <label>Όνομα</label>
              <input
                type='text'
                name='fname'
                onChange={(e) => setSignUpData(prevData => ({ ...prevData, ['first_name']: e.target.value }))}
              />
              <label>Επίθετο</label>
              <input
                type='text'
                name='lname'
                onChange={(e) => setSignUpData(prevData => ({ ...prevData, ['last_name']: e.target.value }))}
              />
              <label>Email</label>
              <input
                type='text'
                name='email'
                onChange={(e) => setSignUpData(prevData => ({ ...prevData, ['email']: e.target.value }))}
              />
              <label>Τηλέφωνο</label>
              <input
                type='text'
                name='phone'
                onChange={(e) => setSignUpData(prevData => ({ ...prevData, ['phone']: e.target.value }))}
              />
              <div className='form__checkbox'>
                <input
                  type='checkbox'
                  name='requestHost'
                  onChange={(e) => setSignUpData(prevData => ({ ...prevData, ['requestHost']: (e.target.value == 'on' ? true : false) }))}
                />
                <label>Θέλω να γίνω Οικοδεσπότης</label>
              </div>
            </form>

            <button onClick={() => handleTabChange()}>Συνέχεια</button>
          </>
        }
        {tab == 2 &&
          <>
            <h3>Επίλεξε φωτογραφία προφίλ </h3>
            {signUpData.profile_picture ?
              <img className='profilePic' src={URL.createObjectURL(signUpData.profile_picture)} alt="Profile picture" />
              :
              <img className='profilePic' src={DefaultProfile} alt="Default profile picture" />
            }
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSignUpData(prevData => ({ ...prevData, ['profile_picture']: e.target.files[0] }))}
            />
            <button onClick={() => handleTabChange()}>Εγγραφή</button>
          </>
        }
        {tab == 3 &&
          <>
            <div className='signUp_success'>
              <p>Η Εγγραφή ολοκληρώθηκε με επιτυχία!</p>
              <img src={CheckCircle_W400_O48} />
            </div>
            <button onClick={() => props.toggleModal('signUp')}>Κλείσιμο</button>
          </>
        }
        <button id='closeModalBtn' onClick={() => props.toggleModal('signUp')}>
          <img src={Close} />
        </button>
      </div>
    </div>
  )
}

export default SignUp