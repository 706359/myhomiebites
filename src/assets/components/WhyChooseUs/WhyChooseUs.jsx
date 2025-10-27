import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faBowlFood,
  faTruckFast,
  faCalendarCheck,
  faRupeeSign,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  const features = [
    {
      icon: faLeaf,
      title: "Pure Veg & Hygienic Kitchens",
      text: "Every meal is prepared by verified local chefs in clean, pure-veg kitchens with the highest hygiene standards.",
    },
    {
      icon: faBowlFood,
      title: "Home-Style Taste",
      text: "Balanced, simple, delicious food — made with love and minimal oil or masala, just like home.",
    },
    {
      icon: faCalendarCheck,
      title: "Daily Changing Menu",
      text: "Enjoy new, fresh dishes every day. Our rotating menu keeps your meals exciting and nutritious.",
    },
    {
      icon: faRupeeSign,
      title: "Affordable Meal Plans",
      text: "Flexible tiffin plans for everyone — from daily to monthly subscriptions, without breaking the bank.",
    },
    {
      icon: faTruckFast,
      title: "On-Time Delivery",
      text: "Hot meals delivered right to your doorstep with punctual, reliable local delivery partners.",
    },
    {
      icon: faShieldHeart,
      title: "Trusted by Families",
      text: "Hundreds of happy customers rely on Raavito daily for healthy, homely food they can trust.",
    },
  ];

  return (
    <section id='why' className={styles.section}>
      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.kicker}>Why Choose Raavito</p>
          <h2 className={styles.title}>Trusted by families for healthy, pure-veg meals</h2>
          <p className={styles.sub}>
            Good food should taste like home — simple, clean, and cooked with care.
          </p>
        </header>

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
    </section>
  );
}
