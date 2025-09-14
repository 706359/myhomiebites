import { useState } from 'react';
import OrderButton from '../OrderButton/orderbutton';

export default function Header({ onRegisterClick, onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={menuOpen ? 'menu-open' : ''}>
      <nav className='nav'>
        <div href='#home' className='logo'>
          <img src='/logo.png' alt='HomieBites Logo' />
        </div>
        <div className='spacer'></div>
        <button className='menu-btn' onClick={() => setMenuOpen(!menuOpen)}>
          <i className='fa-solid fa-bars menu-icon'></i>
          <i className='fa-solid fa-xmark close-icon'></i>
          <span>Menu</span>
        </button>
        <ul>
          <li>
            <a className='pill' href='#rates'>
              Price List
            </a>
          </li>
          <li>
            <a className='pill' href='#about'>
              About
            </a>
          </li>
          <li>
            <a className='pill' href='#gallery'>
              Gallery
            </a>
          </li>
          <li>
            <a className='pill' href='#faq'>
              FAQ
            </a>
          </li>
          <li>
            <a className='pill' href='#contact'>
              Contact
            </a>
          </li>
          <li>
            <button className='btn btn-primary' onClick={onLoginClick}>
              Login
            </button>
          </li>
          <li>
            <button className='btn btnGhost pulse' onClick={onRegisterClick}>
              Register
            </button>
          </li>
          <li>
            <OrderButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
