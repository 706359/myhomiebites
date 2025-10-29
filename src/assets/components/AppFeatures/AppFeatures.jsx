import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileScreenButton,
  faBowlRice,
  faHeart,
  faBell,
  faStar,
  faLocationDot,
  faWallet,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AppFeatures.module.css";

const features = [
  {
    icon: faBowlRice,
    title: "Daily Veg Menu",
    text: "Pure-veg, rotating dishes from local home chefs.",
  },
  {
    icon: faRepeat,
    title: "Subscriptions",
    text: "Weekly & monthly tiffin plans with easy pause.",
  },
  {
    icon: faLocationDot,
    title: "Live Order Tracking",
    text: "Track prep, pickup, and doorstep ETA.",
  },
  { icon: faWallet, title: "Secure Payments", text: "UPI, cards, wallets. Instant receipts." },
  { icon: faBell, title: "Smart Alerts", text: "Menu drops, order status, delivery reminders." },
  { icon: faHeart, title: "Favourites", text: "Save chefs, dishes, and quick re-order." },
  { icon: faStar, title: "Ratings & Hygiene", text: "Chef reviews and hygiene highlights." },
  {
    icon: faMobileScreenButton,
    title: "Clean UI",
    text: "Fast, simple, accessible app experience.",
  },
];

export default function AppFeatures() {
  return (
    <section id='app' className={styles.section}>
      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.kicker}>Raavito App</p>
          <h2 className={styles.title}>Everything you need to eat better, daily</h2>
          <p className={styles.sub}>Order only on the app. Simple. Fast. Reliable.</p>
        </header>

        <div className={styles.layout}>
          {/* Phone mockup */}
          <figure className={styles.phone}>
            <div className={styles.screen}>
              <img src='images/menu2.jpeg' alt='Raavito app menu screen' loading='lazy' />
            </div>
            <figcaption>Browse • Subscribe • Track</figcaption>
          </figure>

          {/* Feature grid */}
          <div className={styles.grid}>
            {features.map((f, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={f.icon} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <a href='/download' className='btn btn-primary'>
            Download App
          </a>
        </div>
      </div>
    </section>
  );
}
