import {
  faArrowUp,
  faHandshake,
  faHeadset,
  faHome,
  faImages,
  faInfoCircle,
  faLeaf,
  faQuestionCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // EXPLORE
  const exploreLinks = [
    { id: 'home', label: 'Home', icon: faHome, scroll: true },
    { id: 'about', label: 'About Us', icon: faInfoCircle, scroll: true },
    { id: 'gallery', label: 'Food Gallery', icon: faImages, scroll: true },
    { label: 'Partner with Us', icon: faHandshake, scroll: false, route: '/chef-registration' },
  ];

  // SERVICES
  const serviceLinks = [
    { id: 'menu', label: 'Today’s Menu', icon: faLeaf, scroll: true },
    { id: 'plans', label: 'Tiffin Plans', icon: faLeaf, scroll: true },
    { id: 'faq', label: 'FAQ', icon: faQuestionCircle, scroll: true },
    { label: 'Download App', icon: faInfoCircle, scroll: false, route: '/app-download' },
  ];

  // SUPPORT / POLICIES
  const supportLinks = [
    { label: 'Help & Support', icon: faHeadset, scroll: false, route: '/contact' },
    { label: 'Terms & Conditions', icon: faInfoCircle, scroll: false, route: '/terms' },
    { label: 'Privacy Policy', icon: faInfoCircle, scroll: false, route: '/privacy' },
    { label: 'Refund & Cancellation', icon: faInfoCircle, scroll: false, route: '/refund-policy' },
    { label: 'Admin Console', icon: faUser, scroll: false, route: '/AdminDashboard' },
  ];

  // const serviceAreas = ['Panchsheel Greens-1', 'Nearby Societies', 'Within ~2 km radius'];

  return (
    <footer className={styles.footer}>
      <div className={styles.decorBg} aria-hidden='true'></div>

      <div className={styles.wrap}>
        {/* BRAND */}
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <img src='/images/logo2.png' alt='Raavito' className={styles.logo} />
          </div>
          <p className={styles.tagline}>Pure-veg, home-style meals from trusted local chefs.</p>
        </div>

        {/* FOOTER NAVIGATION */}
        <nav className={styles.links} aria-label='Footer Navigation'>
          {/* EXPLORE */}
          <div className={styles.col}>
            <h4>Explore</h4>
            <ul>
              {exploreLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => (link.scroll ? scrollToSection(link.id) : navigate(link.route))}
                    className={styles.linkButton}
                  >
                    <FontAwesomeIcon icon={link.icon} />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div className={styles.col}>
            <h4>Services</h4>
            <ul>
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => (link.scroll ? scrollToSection(link.id) : navigate(link.route))}
                    className={styles.linkButton}
                  >
                    <FontAwesomeIcon icon={link.icon} />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div className={styles.col}>
            <h4>Support & Policies</h4>
            <ul>
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <button onClick={() => navigate(link.route)} className={styles.linkButton}>
                    <FontAwesomeIcon icon={link.icon} />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICE AREAS */}
          {/* <div className={styles.col}>
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
          </div> */}
        </nav>
      </div>

      {/* FOOTER BOTTOM */}
      <div className={styles.bottom}>
        <p>© {year} RAAVITO. All rights reserved.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={styles.topBtn}
          aria-label='Back to top'
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
