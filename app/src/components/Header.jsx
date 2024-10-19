import { Link } from 'react-router-dom'
import './Header.css'
import Cart from './Cart'
import { CartProvider } from '../CartContext.jsx'; // Import the CartProvider

function Header() {
  return (
    <>
      <header>

        <div className='wrapperOfHaeder'>
          <div className='search'>
            <div className='searchDiv'>
              <input type="text" placeholder="Search..." />
              <button>Search</button>
            </div>

          </div>
          <div className='iconCnt'>
            <Link to='/login'>
              <span className='icon'>
                <svg width="36px" height="36px" viewBox="0 0 16 16" fill="#e91e63" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#e91e63" />
                  <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#e91e63" />
                </svg>
                Login
              </span>
            </Link>

            <Link to='/'>
              <span className='icon'>
                <svg width="36px" height="36px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill="#e91e63" />
                </svg>
                Home
              </span>
            </Link>
           
        

          </div>
        </div>
      </header>


    </>
  )
}

export default Header