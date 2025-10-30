import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderButton from "../OrderButton/orderbutton";

export default function Header({ onRegisterClick, onLoginClick }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const mobileRef = useRef(null);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onEsc);
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const Icon = ({ children }) => (
    <span className='hb-svg' aria-hidden='true' dangerouslySetInnerHTML={{ __html: children }} />
  );

  return (
    <header className={`hb-header ${open ? "open" : ""}`}>
      <nav className='hb-nav' aria-label='Primary'>
        <div className='hb-left'>
          <a href='#home' className='hb-logo' aria-label='Home'>
            <img src='/raavitologo.png' alt='RAAVITO' />
          </a>

          <label className='hb-search' htmlFor='site-search'>
            <Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`}</Icon>
            <input id='site-search' type='search' placeholder='Search dishes, chefs…' />
          </label>
        </div>

        <ul className='hb-links' role='menubar'>
          <li role='none'>
            <a role='menuitem' href='#rates'>
              <Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="6" rx="1" stroke="currentColor" stroke-width="1.6"/><rect x="3" y="14" width="10" height="6" rx="1" stroke="currentColor" stroke-width="1.6"/></svg>`}</Icon>
              <span>Price List</span>
            </a>
          </li>
          <li role='none'>
            <a role='menuitem' href='#about'>
              <Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 8v.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M11 12h1v4h1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`}</Icon>
              <span>About</span>
            </a>
          </li>
          <li role='none'>
            <a role='menuitem' href='#gallery'>
              <Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 9l2.5 3 2-2.5L16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`}</Icon>
              <span>Gallery</span>
            </a>
          </li>
          <li role='none'>
            <a role='menuitem' href='#faq'>
              <Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 9a3 3 0 114 4c0 2-3 3-3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="4" r="1" fill="currentColor"/></svg>`}</Icon>
              <span>FAQ</span>
            </a>
          </li>
          <li role='none'>
            <a role='menuitem' href='#contact'>
              <Icon>{`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8" stroke="currentColor" stroke-width="1.6"/><path d="M3 8l9 6 9-6" stroke="currentColor" stroke-width="1.6"/></svg>`}</Icon>
              <span>Contact</span>
            </a>
          </li>
        </ul>

        <div className='hb-right'>
          <div className='hb-ctas'>
            <button className='btn btn-primary' onClick={onLoginClick}>
              Login
            </button>
            <button className='btn btnGhost' onClick={onRegisterClick}>
              Signup
            </button>
            <button className='hb-btn ghost pulse' onClick={() => navigate("/chef-registration")}>
              PARTNER WITH RAAVITO!
            </button>
            <OrderButton />
          </div>

          <button
            className='hb-menu'
            onClick={() => setOpen((v) => !v)}
            aria-label='Toggle menu'
            aria-expanded={open}
            aria-controls='hb-mobile'>
            <Icon>{`<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`}</Icon>
          </button>
        </div>
      </nav>

      <ul
        id='hb-mobile'
        className='hb-mobile'
        aria-hidden={!open}
        ref={mobileRef}
        role='dialog'
        aria-label='Mobile menu'>
        <li>
          <a href='#rates' onClick={() => setOpen(false)}>
            Price List
          </a>
        </li>
        <li>
          <a href='#about' onClick={() => setOpen(false)}>
            About
          </a>
        </li>
        <li>
          <a href='#gallery' onClick={() => setOpen(false)}>
            Gallery
          </a>
        </li>
        <li>
          <a href='#faq' onClick={() => setOpen(false)}>
            FAQ
          </a>
        </li>
        <li>
          <a href='#contact' onClick={() => setOpen(false)}>
            Contact
          </a>
        </li>

        <li>
          <button
            onClick={() => {
              setOpen(false);
              onLoginClick();
            }}>
            User Login
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setOpen(false);
              onRegisterClick();
            }}>
            User Signup
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/chef-registration");
            }}>
            Homie Chef Registration
          </button>
        </li>
        <li>
          <OrderButton />
        </li>
      </ul>
    </header>
  );
}
