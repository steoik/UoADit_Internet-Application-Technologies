import { useEffect, useState } from 'react';
import SignUp from './SignUp';
import './Header.css';

const Header = () => {

  const [signUpModal, setSignUpModal] = useState(false);
  const [logInModal, setlogInModal] = useState(false);

  const toggleModal = (modal) => {
    if(modal == 'signUp')
      setSignUpModal((signUpModal) => !signUpModal)
    else if(modal == 'logIn')
      setlogInModal((logInModal) => !logInModal)
  }

  // useEffect(() => {
  //   console.log('signUpModal = ' + signUpModal + '\nlogInModal = ' + logInModal);
  // }, [signUpModal, logInModal]);

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
                Sign Up
              </button>
              <button
                onClick={() => toggleModal('logIn')} 
                className='header__logInBtn'>
                Log in
              </button>
            </div>
          </div>
        </div>
      </header>

      {signUpModal && <SignUp />}
    </>
  )
}

export default Header