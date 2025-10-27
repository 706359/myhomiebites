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
    <section id='partner' className={styles.section}>
      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.kicker}>Partner with Raavito</p>
          <h2 className={styles.title}>Cook. Earn. Grow with Us.</h2>
          <p className={styles.sub}>
            Join our network of verified home chefs bringing healthy, homemade food to their
            neighbourhoods.
          </p>
        </header>

        <div className={styles.grid}>
          {benefits.map((b, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={b.icon} />
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <button className='btn btn-primary pulse' onClick={() => navigate("/chef-registration")}>
            Register as Home Chef
          </button>
        </div>
      </div>
    </section>
  );
}
