import {
  faBell,
  faBowlRice,
  faHeart,
  faLocationDot,
  faMobileScreenButton,
  faRepeat,
  faStar,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AppFeatures.module.css';

const features = [
  {
    icon: faBowlRice,
    title: 'Daily Veg Menu',
    text: 'Fresh, pure-veg meals made in real home kitchens.',
  },
  {
    icon: faRepeat,
    title: 'Easy Subscriptions',
    text: 'Weekly or monthly tiffin plans you can pause anytime.',
  },
  {
    icon: faLocationDot,
    title: 'Order Tracking',
    text: 'See when your meal is being cooked, packed, and delivered.',
  },
  {
    icon: faWallet,
    title: 'Secure Payments',
    text: 'UPI, cards, wallets — all safe and quick.',
  },
  {
    icon: faBell,
    title: 'Meal Alerts',
    text: 'Get notified for menu updates, order status, and delivery time.',
  },
  {
    icon: faHeart,
    title: 'Favourites',
    text: 'Save your favourite chefs and meals for one-tap ordering.',
  },
  {
    icon: faStar,
    title: 'Chef Ratings',
    text: 'Real reviews and hygiene highlights from customers.',
  },
  {
    icon: faMobileScreenButton,
    title: 'Simple App',
    text: 'Clean, fast, easy to use — made for everyday meals.',
  },
];

const accents = [
  ['#de8c45', '#ffb070'],
  ['#7c8cff', '#b7c2ff'],
  ['#00c2a8', '#7ff0df'],
  ['#ff6b6b', '#ffc2c2'],
  ['#b86bff', '#e2c7ff'],
  ['#f4c430', '#ffe58f'],
  ['#29a3ff', '#9ed5ff'],
  ['#ff8ccf', '#ffd3ec'],
];

export default function AppFeatures() {
  return (
    <section className={styles.section} aria-labelledby='af-title'>
      <div className={styles.gridBackdrop} aria-hidden='true' />
      <div className={styles.wrap}>
        <header className={styles.head}>
          <span className={styles.kicker}>What the App Offers</span>
          <h2 id='af-title' className={styles.title}>
            Made simple for daily home-style meals.
          </h2>
          <p className={styles.sub}>
            Easy ordering, clear details, and everything you need for your everyday food routine.
          </p>
        </header>

        <ul className={styles.featureGrid} role='list'>
          {features.map((f, i) => {
            const [a, b] = accents[i % accents.length];
            return (
              <li
                key={i}
                className={styles.card}
                style={{
                  '--accent-a': a,
                  '--accent-b': b,
                  '--stagger': `${i * 60}ms`,
                }}
              >
                <span className={styles.ring}>
                  <span className={styles.ringGlow} />
                  <FontAwesomeIcon icon={f.icon} className={styles.icon} />
                </span>

                <div className={styles.body}>
                  <h3 className={styles.h3}>{f.title}</h3>
                  <p className={styles.p}>{f.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
