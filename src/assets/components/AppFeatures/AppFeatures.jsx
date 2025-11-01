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

// Per-card accent pairs
const accents = [
  ["#de8c45", "#ffb070"],
  ["#7c8cff", "#b7c2ff"],
  ["#00c2a8", "#7ff0df"],
  ["#ff6b6b", "#ffc2c2"],
  ["#b86bff", "#e2c7ff"],
  ["#f4c430", "#ffe58f"],
  ["#29a3ff", "#9ed5ff"],
  ["#ff8ccf", "#ffd3ec"],
];

export default function AppFeatures() {
  return (
    <section className={styles.section} aria-labelledby='af-title'>
      <div className={styles.gridBackdrop} aria-hidden='true' />
      <div className={styles.wrap}>
        <header className={styles.head}>
          <span className={styles.kicker}>Premium Feature Set</span>
          <h2 id='af-title' className={styles.title}>
            Everything you need. Nothing you don’t.
          </h2>
          <p className={styles.sub}>
            Fast flows, safe checks, crisp UI. Built for daily use at scale.
          </p>
        </header>

        <ul className={styles.featureGrid} role='list'>
          {features.map((f, i) => {
            const [a, b] = accents[i % accents.length];
            return (
              <li
                key={i}
                className={styles.card}
                style={{ "--accent-a": a, "--accent-b": b, "--stagger": `${i * 60}ms` }}>
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
