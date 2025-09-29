const Footer = () => {
  return (
    <footer>
      <div className='footer-inner'>
        <a href='#home' className='footer-brand'>
          <img src='/raavitologo.png' alt='RAAVITO Logo' height='70' width='90' loading='lazy' />
        </a>

        <div className='footerButtons'>
          <a className='btn btnGhost' href='#rates' aria-label='Rate List'>
            Rate List
          </a>
          <a
            className='btn btn-primary pulse'
            href='https://wa.me/916395559255'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Order Now on WhatsApp'>
            Order Now
          </a>
        </div>
      </div>

      <nav className='footer-links' aria-label='Footer'>
        <div className='footer-column'>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href='#home'>Home</a>
            </li>
            <li>
              <a href='#rates'>Rate List</a>
            </li>
            <li>
              <a href='#about'>About Us</a>
            </li>
            <li>
              <a href='#gallery'>Food Gallery</a>
            </li>
          </ul>
        </div>

        <div className='footer-column'>
          <h4>Help</h4>
          <ul>
            <li>
              <a href='#faq'>FAQ</a>
            </li>
            <li>
              <a href='#contact'>Contact Us</a>
            </li>
            <li>
              <a href='https://wa.me/916395559255' target='_blank' rel='noopener noreferrer'>
                WhatsApp Support
              </a>
            </li>
          </ul>
        </div>

        <div className='footer-column'>
          <h4>Service Areas</h4>
          <ul>
            <li>Panchsheel Greens-1</li>
            <li>Nearby Societies</li>
            <li>Delivers within a 2 km radius</li>
          </ul>
        </div>
      </nav>

      <div className='footer-bottom'>
        <p>
          © {new Date().getFullYear()} RAAVITO. All rights reserved. | Home-cooked meals delivered
          with love ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
