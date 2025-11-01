import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHandshake,
  faInfoCircle,
  faImages,
  faQuestionCircle,
  faHeadset,
  faMapMarkerAlt,
  faArrowUp,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
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

  const quickLinks = [
    { id: "home", label: "Home", icon: faHome, scroll: true },
    { label: "Partner with Us", icon: faHandshake, scroll: false, route: "/chef-registration" },
    { id: "about", label: "About Us", icon: faInfoCircle, scroll: true },
    { id: "gallery", label: "Food Gallery", icon: faImages, scroll: true },
  ];

  const helpLinks = [
    { id: "faq", label: "FAQ", icon: faQuestionCircle, scroll: true },
    { label: "Help & Support", icon: faHeadset, scroll: false, route: "/contact" },
  ];

  const serviceAreas = ["Panchsheel Greens-1", "Nearby Societies", "Within ~2 km radius"];

  return (
    <footer className={styles.footer}>
      <div className={styles.decorBg} aria-hidden='true'></div>

      <div className={styles.wrap}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <img src='/images/logo2.png' alt='Raavito' className={styles.logo} />
            {/* <div className={styles.badge}>
              <FontAwesomeIcon icon={faLeaf} />
              <span>100% Veg</span>
            </div> */}
          </div>
          <p className={styles.tagline}>Pure-veg, home-style meals from trusted local chefs.</p>
        </div>

        {/* Footer Navigation */}
        <nav className={styles.links} aria-label='Footer'>
          {/* Quick Links */}
          <div className={styles.col}>
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => (link.scroll ? scrollToSection(link.id) : navigate(link.route))}
                    className={styles.linkButton}>
                    <FontAwesomeIcon icon={link.icon} />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className={styles.col}>
            <h4>Help</h4>
            <ul>
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => (link.scroll ? scrollToSection(link.id) : navigate(link.route))}
                    className={styles.linkButton}>
                    <FontAwesomeIcon icon={link.icon} />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div className={styles.col}>
            <h4>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.colIcon} />
              Service Areas
            </h4>
            <ul>
              {serviceAreas.map((area, index) => (
                <li key={index} className={styles.areaItem}>
                  <span className={styles.dot}></span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Footer Bottom */}
      <div className={styles.bottom}>
        <p>© {year} RAAVITO. All rights reserved. Home-cooked meals delivered with care.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={styles.topBtn}
          aria-label='Back to top'>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
