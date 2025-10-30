import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        {/* Brand */}
        <div className={styles.brand}>
          <img src='/raavitologo.png' alt='Raavito' />
          <p>Pure-veg, home-style meals from trusted local chefs.</p>
        </div>

        {/* Footer Navigation */}
        <nav className={styles.links} aria-label='Footer'>
          {/* Quick Links */}
          <div className={styles.col}>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <button onClick={() => scrollToSection("home")} className={styles.linkButton}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("rates")} className={styles.linkButton}>
                  Partner with Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className={styles.linkButton}>
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("gallery")} className={styles.linkButton}>
                  Food Gallery
                </button>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Help</h4>
            <ul>
              <li>
                <button onClick={() => scrollToSection("faq")} className={styles.linkButton}>
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/contact")} className={styles.linkButton}>
                  Help & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
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

      {/* Footer Bottom */}
      <div className={styles.bottom}>
        <p>© {year} RAAVITO. All rights reserved. Home-cooked meals delivered with care.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={styles.top}
          aria-label='Back to top'>
          ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;
