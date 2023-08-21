import { useEffect, useState } from 'react';
import SignUp from './SignUp';
import './Header.css';

const Header = () => {

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
      console.log('Error: toggleModal')
  }

  useEffect(() => {
    console.log('signUpModal = ' + signUpModal + '\nlogInModal = ' + logInModal);
  }, [signUpModal, logInModal]);

  return (
    <>
      <header className='header'>
        <div className='header__content'>
          <div className='header__logo'>
            <h1>Website</h1>
          </div>
          <div className='header__navbar'>
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
          </div>
        </div>
      </header>

      {(signUpModal || logInModal) && 
        <div className='modal'>
            <div onClick={() => toggleModal('false')} className="modal__overlay"></div>
            {signUpModal &&
              <SignUp toggleModal={toggleModal} />
            }
        </div>
      }
    </>
  )
}

export default Header