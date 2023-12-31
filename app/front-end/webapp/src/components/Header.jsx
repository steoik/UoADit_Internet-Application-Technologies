import { useContext, useEffect, useState } from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import './Header.css';
import { AuthContext } from "../contexts/AuthContext";
import DefaultProfile from '../assets/person_FILL0_wght300_GRAD0_opsz48.svg'

import Logo from '../assets/Logo-plain.png'

const Header = () => {
  
  const { avatar, authData, logout } = useContext(AuthContext);
  
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

  const handleLogOut = () => {
    logout()
  }

  return (
    <>
      <header className='header'>
        <div className='header__content'>
          <div className='header__logo'>
            <a href='/'>
              <img src={Logo}></img>
              <h1>Σπιτονοικοκύρης</h1>
            </a>
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
            <>
              <div className='header__links'>
              {authData.role == 'host' &&
                <a href='/listing/submit'>Καταχώρηση</a>
              }
              {authData.role == 'admin' &&
                <a href='/admin'>Διαχείριση</a>
              }
              </div>
              <div className='header__avatar__wrapper'>
                <div className='header__avatar'>
                  {avatar ? (
                    <img src={avatar} alt='User_Avatar'/>
                  ) : (
                    <img src={DefaultProfile} alt='Default_Profile'/>
                  )}
                  <div className="avatar__dropdown">
                    <p><span>Καλωσήρθες</span> <br></br> {authData.username}</p>
                    <a href={`/profile/${authData.username}`}>Προφίλ</a>
                    <a href="#">Μηνύματα</a>
                    <a href="#" onClick={handleLogOut}>Αποσύνεση</a>
                  </div>
                </div>
              </div>
            </>
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