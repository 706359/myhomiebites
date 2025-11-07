import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlRice,
  faHandshake,
  faMoneyBillTrendUp,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styles from "./PartnerWithUs.module.css";

export default function PartnerWithUs() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: faBowlRice,
      title: "Start With Your Kitchen",
      desc: "Cook pure-veg, homely meals — no fancy setup required. Just your passion for food.",
    },
    {
      icon: faHandshake,
      title: "Zero Listing Fee",
      desc: "Join Raavito without upfront cost. We handle discovery, delivery, and marketing.",
    },
    {
      icon: faShieldHeart,
      title: "Hygiene & Support",
      desc: "We help you maintain safety standards with simple training and kitchen checks.",
    },
    {
      icon: faMoneyBillTrendUp,
      title: "Earn Every Day",
      desc: "Get paid for every order. Transparent earnings and flexible schedules.",
    },
  ];

  return (
    <section id='partner' className={styles.section} aria-labelledby='partner-title'>
      <div className={styles.gridBackdrop} aria-hidden='true' />
      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.kicker}>Partner with Raavito</p>
          <h2 id='partner-title' className={styles.title}>
            Cook. Earn. Grow with Us.
          </h2>
          <p className={styles.sub}>
            Join our network of verified home chefs bringing healthy, homemade food to their
            neighbourhoods.
          </p>
        </header>

        <div className={styles.grid}>
          {benefits.map((b, i) => (
            <div
              key={i}
              className={styles.card}
              style={{
                "--accent-a": ["#de8c45", "#29a3ff", "#00c2a8", "#ff6b6b"][i % 4],
                "--accent-b": ["#ffb070", "#9ed5ff", "#7ff0df", "#ffc2c2"][i % 4],
                "--stagger": `${i * 80}ms`,
              }}>
              <div className={styles.ring}>
                <span className={styles.ringGlow}></span>
                <FontAwesomeIcon icon={b.icon} className={styles.icon} />
              </div>
              <h3 className={styles.h3}>{b.title}</h3>
              <p className={styles.p}>{b.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <button className='btn btn-primary' onClick={() => navigate("/chef-registration")}>
            Register Kitchen
          </button>
        </div>
      </div>
    </section>
  );
}
