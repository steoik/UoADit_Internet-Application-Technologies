import { useContext, useState } from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import './Header.css';
import { AuthContext } from "../contexts/AuthContext";
import DefaultProfile from '../assets/person_FILL0_wght300_GRAD0_opsz48.svg'
import { Link } from 'react-router-dom';

const Header = () => {
  
  const { authData } = useContext(AuthContext);

  const [signUpModal, setSignUpModal] = useState(false);
  const [logInModal, setLogInModal] = useState(false);

  const toggleModal = (modal) => {
    if(modal == 'signUp')
      setSignUpModal((signUpModal) => !signUpModal)
    else if(modal == 'logIn')
      setLogInModal((logInModal) => !logInModal)
    else if(modal == 'false'){
      setSignUpModal(false)
      setLogInModal(false)
    }
    else
      console.error('toggleModal')
  }
  return (
    <>
      <header className='header'>
        <div className='header__content'>
          <div className='header__logo'>
            {/* <a href='/'> */}
            <h1>Website</h1>
            {/* </a> */}
          </div>
          <div className='header__navbar'>
            {!authData.isLoggedIn ? (
              <div className='header__suliWrapper'>
                <button
                  onClick={() => toggleModal('signUp')} 
                  className='header__signUpBtn'>
                  Εγγραφή
                </button>
                <button
                  onClick={() => toggleModal('logIn')} 
                  className='header__logInBtn'>
                  Σύνδεση
                </button>
              </div>
            ) : (
              // Check the authData and see if the User has a profile picture
              <div className='header__avatar'>
                <img src={DefaultProfile} alt='Default_Profile'/>
              </div>
            )}
          </div>
        </div>
      </header>

      {(signUpModal || logInModal) && 
        <div className='modal'>
            <div onClick={() => toggleModal('false')} className="modal__overlay"></div>
            {signUpModal ? (
              <SignUp toggleModal={toggleModal} />
            ) : (
              <LogIn toggleModal={toggleModal} />
            )}
        </div>
      }
    </>
  )
}

export default Header