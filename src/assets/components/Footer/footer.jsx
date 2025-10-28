import styles from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.brand}>
          <img src='/raavitologo.png' alt='Raavito' />
          <p>Pure-veg, home-style meals from trusted local chefs.</p>
        </div>

        <nav className={styles.links} aria-label='Footer'>
          <div className={styles.col}>
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

          <div className={styles.col}>
            <h4>Help</h4>
            <ul>
              <li>
                <a href='#faq'>FAQ</a>
              </li>
              <li>
                <a href='#contact'>Contact Us</a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Service Areas</h4>
            <ul>
              <li>Panchsheel Greens-1</li>
              <li>Nearby Societies</li>
              <li>Within ~2 km radius</li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>© {year} RAAVITO. All rights reserved. Home-cooked meals delivered with care.</p>
        <a href='#home' className={styles.top} aria-label='Back to top'>
          ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
